import React from 'react';
import { AuthContext } from '../App/App';
import userService from '../services/user-service';

function Logout() {
  const { dispatch } = React.useContext(AuthContext);

  userService.logout().then(() => {
    dispatch({
        type: "LOGOUT",
      });
  });

  return null;
}

export default Logout;