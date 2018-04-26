import React from 'react';
import { Button } from 'a_design-components';
import './Save.css';

export default ({ user, logoutClick, askForSaveClick }) => {
  if (user)
    return (
      <div className="Details">
        {user.username}, <a onClick={logoutClick}>Déconnexion</a>
      </div>
    );

  return (
    <div className="Save">
      Pour sauver/retrouver votre budget, <Button title="Connectez-vous" onClick={askForSaveClick} />
    </div>
  );
};
