import React from 'react';
import { FormActions, Paragraph } from 'a_design-components';
import './LoginModal.css';

export default ({
  loginClick,
  createAccountClick,
  createAccountStatus,
  createAccountError,
  loginClose,
  loginStatus,
  loginError,
  loginMessage,
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
    <div className="modal-overlay" onClick={e => (e.target.className === 'overlay' && !disable ? loginClose() : null)}>
      <div className="modal">
        <div className="modal-title">Connexion</div>
        <form>
          <div className="modal-content">
            {loginMessage ? <Paragraph>{loginMessage}</Paragraph> : ''}
            <div className="form-entry">
              <label className="label">Identifiant</label>
              <input type="text" className="input" ref={_ => (inputUsername = _)} disabled={disable} />
            </div>
            <div className="form-entry">
              <label className="label">Mot de passe</label>
              <input type="text" className="input" ref={_ => (inputPassword = _)} disabled={disable} />
            </div>
            {createAccountError ? <div className="error-message">{createAccountError}</div> : ''}
            {loginError ? <div className="error-message">{loginError}</div> : ''}
          </div>
          <FormActions>
            <div>
              <button className="button" onClick={wrapClick(loginClick)} disabled={disable}>
                {loginTitle}
              </button>
            </div>
            <div>ou</div>
            <div>
              <button className="button secondary" onClick={wrapClick(createAccountClick)} disabled={disable}>
                {createAccountTitle}
              </button>
            </div>
          </FormActions>
        </form>
      </div>
    </div>
  );
};
