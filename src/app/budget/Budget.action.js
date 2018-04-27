import {
  fetchBudget,
  createAccount,
  login,
  loginWithToken,
  logout,
  update,
  remove,
  getServer,
  createServer,
  saveServer,
  TOKEN_TOO_OLD,
} from './Budget.service';
import { SMALL_BREAKPOINT } from './../../config';

let store;

export const init = stateOwner => {
  store = stateOwner;
  store.state = {
    budget: [],
    loadBudgetStatus: null,
    budgetUpdateStatus: null,
    createAccountStatus: null,
    createAccountError: null,
    loginStatus: null,
    loginError: null,
    loginMessage: null,
    loginWithTokenStatus: null,
    user: null,
    showLogin: false,
    focusOnCat: null,
    focusOnGroup: null,
    width: null,
    height: null,
    isSmall: false,
    showEntries: true,
    showGraph: false,
  };
};

export const loadBudgetRequest = () => {
  store.setState({ loadBudgetStatus: 'pending' });

  return fetchBudget().then(_ => {
    store.setState({
      budget: _,
      loadBudgetStatus: 'success',
    });
  });
};
export const loadServerBudgetRequest = () => {
  store.setState({ loadBudgetStatus: 'pending' });

  return getServer()
    .then(fetchBudget)
    .then(_ => {
      store.setState({
        budget: _,
        loadBudgetStatus: null,
      });
    })
    .catch(() => {
      store.setState({
        loadBudgetStatus: 'An error occured',
      });
    });
};

export const budgetUpdate = (id, type, value, parentType) => {
  update(id, type, value, parentType).then(_ => {
    store.setState({
      budget: _,
      focusOnCat: parentType === 'cat' ? id : null,
      focusOnGroup: parentType === 'group' ? id : null,
    });

    saveServer();
  });
};
export const budgetRemove = id => {
  remove(id).then(_ => {
    store.setState({ budget: _ });
    saveServer();
  });
};
export const budgetUpdateRequest = () => {};
export const askForSaveClick = () => {
  store.setState({ showLogin: true });
};

export const createAccountClick = (username, password) => {
  if (store.state.createAccountError !== '') {
    store.setState({
      createAccountStatus: 'pending',
      createAccountError: null,
      loginError: null,
    });
  } else {
    store.setState({ createAccountStatus: 'pending' });
  }

  createAccount(username, password)
    .then(() => login(username, password))
    .then(_ => {
      store.setState({
        user: _,
        showLogin: false,
        createAccountError: null,
        createAccountStatus: null,
      });

      createServer();
    })
    .catch(_ =>
      store.setState({
        createAccountStatus: 'error',
        createAccountError: 'Impossible de créer un compte, veuillez réessayer plus tard.',
      })
    );
};
export const checkLogin = () => {
  store.setState({ loginWithTokenStatus: 'pending' });

  loginWithToken()
    .then(user => {
      store.setState({
        user,
        loginWithTokenStatus: null,
      });
      loadServerBudgetRequest();
    })
    .catch(_ => {
      if (_ === TOKEN_TOO_OLD) tokenTooOld();
      store.setState({
        loginWithTokenStatus: null,
      });
    });
};
export const loginClick = (username, password) => {
  store.setState({
    loginStatus: 'pending',
    loginError: null,
  });

  login(username, password)
    .then(_ => {
      store.setState({
        user: _,
        showLogin: false,
        loginStatus: null,
        loginError: null,
      });

      loadServerBudgetRequest();
    })
    .catch(_ =>
      store.setState({
        loginStatus: 'error',
        loginError: 'Identifiant/Mot de passe invalide',
      })
    );
};
export const loginClose = () =>
  store.setState({
    showLogin: false,
    loginMessage: null,
  });
export const loginRequest = (username, password) => {};
export const tokenTooOld = () => {
  store.setState({
    showLogin: true,
    loginMessage: 'Vous êtiez connecté mais le délai de sécurité a été dépassé. Veuillez vous reconnecter.',
  });
};
export const logoutClick = () => {
  logout();
  store.setState({ user: null });
};

export const checkWindowDimensions = () => {
  store.setState({
    width: window.innerWidth,
    height: window.innerHeight,
    isSmall: window.innerWidth <= SMALL_BREAKPOINT,
  });
};

export const askShowGraph = () => {
  store.setState({
    showGraph: true,
    showEntries: false,
  });
};

export const askShowEntries = () => {
  store.setState({
    showGraph: false,
    showEntries: true,
  });
};
