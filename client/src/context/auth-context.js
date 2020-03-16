import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import api from '../utils/api';
import _isEmpty from 'lodash/isEmpty';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get('auth_id')) {
      verifyToken();
    }
  }, [])

  const verifyToken = async () => {
    try {
      const verifiedUser = await api.get('users/verify');  
      handleUserStorage(verifiedUser.data);
    } catch (error) {
      console.error(error);
    }
  }
  

  const handleUserStorage = (user = {}) => {
    if (_isEmpty(user)) {
      Cookies.remove('auth_id');
      setIsLoggedIn(false);
      setUser(user);
      window.localStorage.removeItem('user'); 
    } else if (!_isEmpty(user) && Cookies.get('auth_id')) {
      setIsLoggedIn(true);
      setUser(user);
      window.localStorage.setItem('user', JSON.stringify(user))
    }
  }
  
  const login = async (credentials) => {
    try {
      const loggedInUser = await api.post('/users/login', { ...credentials });
      handleUserStorage(loggedInUser.data); 
    } catch (error) {
      handleUserStorage();
      throw new Error(error.response.data);
    }
  }

  const register = async (data) => {
    try {
      const registeredUser = await api.post('/users/register', { ...data });
      handleUserStorage(registeredUser.data);
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  const logout =  async () => {
    try {
      await api.get('/users/logout');
      handleUserStorage();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ user, handleUserStorage, isLoggedIn, login, register, logout }} {...props} />
  )
}

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
