import axios from 'axios';
import uuidv4 from 'uuid/v4';
import jwtDecode from 'jwt-decode';
import flatMap from 'lodash/flatMap';
import _remove from 'lodash/remove';
import _throttle from 'lodash/throttle';
import { budgetDefaultEntries, budgetDefaultCatergories, budgetDefaultGroups } from './../../data';
import { API } from './../../config';

const MAX_BASE = 1000;
export const TOKEN_TOO_OLD = 'token-too-old';

let cats = budgetDefaultCatergories;
let groups = budgetDefaultGroups;
let entries = budgetDefaultEntries;
let budget = [];

export const fetchBudget = () => {
  return new Promise((res, rej) => {
    generateBudget();
    res(budget);
  });
};

export const maxBudget = () => {
  const max = budget
    .map(_ => {
      if (_.group) {
        return flatMap(_.group, _ => _.data).reduce((acc, entry) => acc + (entry.value ? entry.value : 0), 0);
      }

      return _.data.reduce((acc, entry) => acc + (entry.value ? entry.value : 0), 0);
    })
    .reduce((max, catMax) => (catMax > max ? catMax : max), 0);
  return max > MAX_BASE ? Math.ceil(max / 100) * 100 : MAX_BASE;
};

export const restBudget = () => {
  const totals = budget.map(_ => {
    if (_.group) {
      return flatMap(_.group, _ => _.data).reduce((acc, entry) => acc + (entry.value ? entry.value : 0), 0);
    }

    return _.data.reduce((acc, entry) => acc + (entry.value ? entry.value : 0), 0);
  });

  return totals[0] - totals[1] - totals[2] - totals[3];
};

export const createAccount = (username, password) => {
  return axios.post(`${API}/users`, { username, password }).then(_ => _.data);
};

export const login = (username, password) => {
  return axios.post(`${API}/login`, { username, password }).then(_ => {
    localStorage.setItem('token', _.data.token);
    return jwtDecode(_.data.token);
  });
};

export const loginWithToken = () => {
  return new Promise((res, rej) => {
    const token = localStorage.getItem('token');

    if (!token) return rej('No token available');

    axios
      .get(`${API}/loginWithToken`, {
        headers: { Authorization: token },
      })
      .then(() => {
        res(jwtDecode(token));
      })
      .catch(() => {
        localStorage.removeItem('token');
        rej(TOKEN_TOO_OLD);
      });
  });
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const update = (id, type, val, parentType) => {
  return new Promise((res, rej) => {
    if (!parentType) {
      entries = entries.map(entry => {
        if (entry.id !== id) return entry;

        switch (type) {
          case 'value':
            entry['value'] = Number(val);
            break;
          case 'label':
          default:
            entry['label'] = val;
            break;
        }

        return entry;
      });
    } else {
      let newEntry = { id: uuidv4(), label: '', value: '' };

      entries.push(newEntry);

      switch (parentType) {
        case 'cat':
          cats = cats.map(_ => {
            if (_.id === id) {
              _.data.push(newEntry.id);
            }

            return _;
          });
          break;
        case 'group':
          groups = groups.map(_ => {
            if (_.id === id) {
              _.data.push(newEntry.id);
            }

            return _;
          });
          break;
        default:
          console.error(`ParentType '${parentType}' is not valid`);
      }
    }

    saveLocal();
    generateBudget();

    res(budget);
  });
};

export const remove = id => {
  return new Promise((res, rej) => {
    _remove(entries, _ => _.id === id);
    cats = cats.map(cat => {
      _remove(cat.data, _ => _ === id);
      return cat;
    });
    groups = groups.map(group => {
      _remove(group.data, _ => _ === id);
      return group;
    });

    saveLocal();
    generateBudget();

    res(budget);
  });
};

// ---------
// Private
// ---------

const generateBudget = () => {
  budget = cats.map(category => {
    const cat = JSON.parse(JSON.stringify(category));

    if (cat.data) {
      cat.data = cat.data.map(entryId => entries.filter(_ => _.id === entryId)[0]);
    }
    if (cat.group) {
      cat.group = cat.group.map(groupId => {
        let group = groups.filter(_ => _.id === groupId)[0];
        group = JSON.parse(JSON.stringify(group));
        group.data = group.data.map(entryId => entries.filter(_ => _.id === entryId)[0]);
        return group;
      });
    }

    return cat;
  });
};

const saveLocal = () => {
  localStorage.setItem('categories', JSON.stringify(cats));
  localStorage.setItem('groups', JSON.stringify(groups));
  localStorage.setItem('entries', JSON.stringify(entries));
};

export const createServer = () => {
  axios
    .post(
      `${API}/finances`,
      {
        categories: cats,
        groups: groups,
        entries: entries,
      },
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    )
    .catch(function(error) {
      console.error('Impossible to create finances on server', error);
    });
};

export const saveServer = _throttle(() => {
  if (isLogged()) {
    axios
      .put(
        `${API}/finances`,
        {
          categories: cats,
          groups: groups,
          entries: entries,
        },
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      )
      .catch(function(error) {
        console.error('Impossible to save on server', error);
      });
  }
}, 4000);

export const getServer = () => {
  return axios
    .get(`${API}/finances`, {
      headers: { Authorization: localStorage.getItem('token') },
    })
    .then(_ => {
      cats = _.data.data.categories;
      groups = _.data.data.groups;
      entries = _.data.data.entries;
      return _;
    })
    .catch(function(error) {
      console.log('Impossible to retrieve from server', error);
    });
};

const isLogged = () => {
  return localStorage.getItem('token') !== null;
};

// Init
(() => {
  const storage = window.localStorage ? window.localStorage : null;
  const localGet = (id, deflt) => (storage && storage.getItem(id) !== null ? JSON.parse(storage.getItem(id)) : deflt);

  cats = localGet('categories', cats);
  groups = localGet('groups', groups);
  entries = localGet('entries', entries);
})();
