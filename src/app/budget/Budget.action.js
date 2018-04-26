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
} from './Budget.service';

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
    user: null,
    showLogin: false,
    focusOnCat: null,
    focusOnGroup: null,
  };
};

export const loadBudgetRequest = () => loading('budget', 'loadBudgetStatus', fetchBudget);
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
      createAccountError: '',
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
        createAccountError: _.response.data.message,
      })
    );
};
export const checkLogin = () => {
  const user = loginWithToken();
  if (user) {
    store.setState({ user });
  }
};
export const loginClick = (username, password) => {
  store.setState({
    loginStatus: 'pending',
  });

  login(username, password)
    .then(_ => {
      store.setState({
        user: _,
        showLogin: false,
        loginStatus: null,
        loginError: null,
      });

      getServer().then(loadBudgetRequest);
    })
    .catch(_ =>
      store.setState({
        loginStatus: 'error',
        loginError: 'Identifiant/Mot de passe invalide',
      })
    );
};
export const loginClose = () => store.setState({ showLogin: false });
export const loginRequest = (username, password) => {};
export const tokenTooOld = () => {};
export const logoutClick = () => {
  logout();
  store.setState({ user: null });
};

const loading = (dataKey, loadingKey, loader, loaderParams = []) => {
  store.setState({ [loadingKey]: 'pending' });

  return loader.apply(null, loaderParams).then(_ => {
    store.setState({
      [dataKey]: _,
      [loadingKey]: 'success',
    });
  });
};
