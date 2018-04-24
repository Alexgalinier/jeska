import { fetchBudget, createAccount, login, loginWithToken, logout } from './Budget.service';

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
  };
};

export const loadBudgetRequest = () => loading('budget', 'loadBudgetStatus', fetchBudget);
export const budgetUpdate = (id, type, value, parentType) => {};
export const budgetUpdateRequest = () => {};
export const askForSaveClick = () => store.setState({ showLogin: true });
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
    .then(_ =>
      store.setState({
        user: _,
        showLogin: false,
        createAccountError: null,
        createAccountStatus: null,
      })
    )
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
    .then(_ =>
      store.setState({
        user: _,
        showLogin: false,
        loginStatus: null,
        loginError: null,
      })
    )
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
