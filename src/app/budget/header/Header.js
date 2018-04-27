import React from 'react';
import { Button } from 'a_design-components';
import './Header.css';

export default ({
  showGraph,
  askShowGraph,
  askShowEntries,
  user,
  loginWithTokenStatus,
  logoutClick,
  askForSaveClick,
}) => {
  let loginBlock;
  if (user) {
    loginBlock = (
      <div className="Details">
        {user.username}, <a onClick={logoutClick}>Déconnexion</a>
      </div>
    );
  } else if (loginWithTokenStatus === 'pending') {
    loginBlock = <div className="Details">Reconnexion...</div>;
  } else {
    loginBlock = (
      <div>
        <Button title="Se connecter" onClick={askForSaveClick} />
      </div>
    );
  }

  return (
    <div className="Header">
      {showGraph ? (
        <div>
          <Button title="Voir Dépenses" onClick={askShowEntries} />
        </div>
      ) : (
        ''
      )}
      {!showGraph ? (
        <div>
          <Button title="Voir Budget" onClick={askShowGraph} />
        </div>
      ) : (
        ''
      )}
      {loginBlock}
    </div>
  );
};
