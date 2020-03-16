import React  from 'react'
import Cookies from 'js-cookie';
import { useUser } from '../../context/user-context'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authId = Cookies.get('auth_id');
  const user = useUser();

  if (!user || !authId) {
    return <Redirect to={{ pathname: '/login', state: { from: rest.location } }} />
  }
  return <Route component={Component} {...rest} />
}

export default PrivateRoute
