import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/user-context';
import _isEmpty from 'lodash/isEmpty';
import { Route, Redirect } from 'react-router-dom'

const RestrictedRoute = ({ component: Component, ...rest }) => {
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { isLoggedIn } = useUser();

  // useEffect(() => {
  //   if (isLoggedIn) 
  //   setIsUserLoggedIn(isLoggedIn);
  // }, [isLoggedIn]);

  if (isLoggedIn) {
    return <Redirect to={{ pathname: '/profile', state: { from: rest.location } }} />
  } 
  return <Route component={Component} {...rest} />
}

export default RestrictedRoute;