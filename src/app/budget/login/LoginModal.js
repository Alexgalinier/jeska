import React, { PureComponent } from 'react';
import { FormActions, Paragraph } from 'a_design-components';
import './LoginModal.css';

export default class LoginModal extends PureComponent {
  constructor(props) {
    super(props);
    this.inputUsername = null;
  }

  componentDidMount() {
    this.inputUsername.focus();
  }

  render() {
    const {
      loginClick,
      createAccountClick,
      createAccountStatus,
      createAccountError,
      loginClose,
      loginStatus,
      loginError,
      loginMessage,
    } = this.props;

    let loginTitle = 'Se connecter',
      createAccountTitle = 'Créer un compte',
      disable = false,
      inputPassword;

    const wrapClick = caller => e => {
      e.preventDefault();
      caller(this.inputUsername.value, inputPassword.value);
    };

    if (createAccountStatus === 'pending') {
      createAccountTitle = 'En cours...';
      disable = true;
    }

    if (loginStatus === 'pending') {
      loginTitle = 'En cours...';
      disable = true;
    }

    let errorMessage = null;
    if (createAccountError || loginError) {
      errorMessage = createAccountError || loginError;
    }

    return (
      <div
        className="modal-overlay"
        onClick={e => (e.target.className === 'modal-overlay' && !disable ? loginClose() : null)}
      >
        <div className="modal">
          <div className="modal-title">Connexion</div>
          <div
            className="modal-close"
            onClick={e => (e.target.className === 'modal-close' && !disable ? loginClose() : null)}
          >
            x
          </div>
          <form>
            <div className="modal-content">
              {loginMessage ? <Paragraph>{loginMessage}</Paragraph> : ''}
              <div className="form-entry">
                <label className="label">Identifiant</label>
                <input type="text" className="input" ref={_ => (this.inputUsername = _)} disabled={disable} />
              </div>
              <div className="form-entry">
                <label className="label">Mot de passe</label>
                <input type="text" className="input" ref={_ => (inputPassword = _)} disabled={disable} />
              </div>
              {errorMessage ? (
                <div className="error-message">
                  <Paragraph>{errorMessage}</Paragraph>
                </div>
              ) : (
                ''
              )}
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
  }
}
