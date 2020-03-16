import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

const Logout = () => {
  const history = useHistory();
  const { logout } = useAuth();
  useEffect(() => {
    const logoutUser = async () => {
      await logout();
      history.push('/')
    }
    logoutUser();
  }, [logout, history]);
  return null;
}

export default Logout
