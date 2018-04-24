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

  return <Button title="Sauver ce budget" onClick={askForSaveClick} className="Save" />;
};
