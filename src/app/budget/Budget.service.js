import axios from 'axios';
import uuidv4 from 'uuid/v4';
import jwtDecode from 'jwt-decode';
import flatMap from 'lodash/flatMap';
import _remove from 'lodash/remove';
import { budgetExample3entry, budgetExample3cat, budgetExample3group } from './Budget.example';

const MAX_BASE = 1000;
const API = 'http://localhost:3000';

let cats = budgetExample3cat;
let groups = budgetExample3group;
let entries = budgetExample3entry;
let budget = null;

const initBudget = () => {
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

initBudget();

export const fetchBudget = () => {
  return new Promise((res, rej) => {
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
  const token = localStorage.getItem('token');
  return token === null ? null : jwtDecode(token);
};

export const logout = () => {
  localStorage.clear('token');
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

    initBudget();

    res(budget);
  });
};

export const remove = id => {
  return new Promise((res, rej) => {
    console.log(id);
    _remove(entries, _ => _.id === id);
    cats = cats.map(cat => {
      _remove(cat.data, _ => _ === id);
      return cat;
    });
    groups = groups.map(group => {
      _remove(group.data, _ => _ === id);
      return group;
    });

    initBudget();

    res(budget);
  });
};

// class BudgetServiceClass {
//   constructor() {
//     this.cats = budgetExample3cat;
//     this.group = budgetExample3group;
//     this.entries = budgetExample3entry;
//
//     this.budget = this.cats.map(cat => {
//       if (cat.data) {
//         cat.data = cat.data.map(entryId => this.entries.filter(_ => _.id === entryId)[0]);
//       }
//       if (cat.group) {
//         cat.group = cat.group.map(groupId => {
//           const group = this.group.filter(_ => _.id === groupId)[0];
//           group.data = group.data.map(entryId => this.entries.filter(_ => _.id === entryId)[0]);
//           return group;
//         });
//       }
//
//       return cat;
//     });
//   }
//
//   maxBudget() {
//     const max = this.budget
//       .map(_ => {
//         if (_.group) {
//           return flatMap(_.group, _ => _.data).reduce((acc, entry) => acc + entry.value, 0);
//         }
//
//         return _.data.reduce((acc, entry) => acc + entry.value, 0);
//       })
//       .reduce((max, catMax) => (catMax > max ? catMax : max), 0);
//     return max > MAX_BASE ? Math.ceil(max / 100) * 100 : MAX_BASE;
//   }
//
//   updateBudget(id, type, val) {
//     return new Promise((res, rej) => {
//       this.entries = this.entries.map(entry => {
//         if (entry.id !== id) return entry;
//
//         switch (type) {
//           case 'value':
//             entry['value'] = Number(val);
//             break;
//           case 'label':
//           default:
//             entry['label'] = val;
//             break;
//         }
//
//         return entry;
//       });
//       res();
//     });
//   }
//
//   fetchBudget = () => {
//     return new Promise((res, rej) => {
//       res(this.budget);
//     });
//   };
//
//   loginUser(username, password) {
//     return axios
//       .post(`${API}/login`, {username, password})
//       .then(_ => {
//         localStorage.setItem('token', _.data.token);
//         return jwtDecode(_.data.token);
//       })
//   }
// }
//
// export const BudgetService = new BudgetServiceClass();
