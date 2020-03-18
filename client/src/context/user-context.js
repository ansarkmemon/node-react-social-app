import React from 'react'
import { useAuth } from './auth-context';

const UserContext = React.createContext();

const UserProvider = (props) => {
  const { user, isLoggedIn } = useAuth();
  return <UserContext.Provider value={{user, isLoggedIn}} {...props} />
}

const useUser = () => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return context
}


export { UserProvider, useUser }
