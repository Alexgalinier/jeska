import React from 'react';
import { FormActions } from 'a_design-components';
import './LoginModal.css';

export default ({
  loginClick,
  createAccountClick,
  createAccountStatus,
  createAccountError,
  loginClose,
  loginStatus,
  loginError,
}) => {
  let loginTitle = 'Se connecter',
    createAccountTitle = 'Créer un compte',
    disable = false,
    inputUsername,
    inputPassword;

  const wrapClick = caller => e => {
    e.preventDefault();
    caller(inputUsername.value, inputPassword.value);
  };

  if (createAccountStatus === 'pending') {
    createAccountTitle = 'En cours...';
    disable = true;
  }

  if (loginStatus === 'pending') {
    loginTitle = 'En cours...';
    disable = true;
  }

  return (
    <div className="overlay" onClick={e => (e.target.className === 'overlay' ? loginClose() : null)}>
      <div className="modal">
        <div className="modal-title">Connexion</div>
        <form>
          <div className="modal-content">
            <div className="form-entry ">
              <label className="label">Identifiant</label>
              <input
                type="text"
                className="input"
                ref={_ => (inputUsername = _)}
                disabled={disable ? 'disabled' : ''}
              />
            </div>
            <div className="form-entry ">
              <label className="label">Mot de passe</label>
              <input
                type="text"
                className="input"
                ref={_ => (inputPassword = _)}
                disabled={disable ? 'disabled' : ''}
              />
            </div>
            {createAccountError ? <div className="error-message">{createAccountError}</div> : ''}
            {loginError ? <div className="error-message">{loginError}</div> : ''}
          </div>
          <FormActions>
            <div>
              <button className="button" onClick={wrapClick(loginClick)} disabled={disable ? 'disabled' : ''}>
                {loginTitle}
              </button>
            </div>
            <div>ou</div>
            <div>
              <button
                className="button secondary"
                onClick={wrapClick(createAccountClick)}
                disabled={disable ? 'disabled' : ''}
              >
                {createAccountTitle}
              </button>
            </div>
          </FormActions>
        </form>
      </div>
    </div>
  );
};
