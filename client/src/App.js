/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TitleBar from './components/base/TitleBar';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import SideBar from './components/base/SideBar';
import Bookmarks from './pages/Bookmarks';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/routes/PrivateRoute';
import Logout from './pages/Logout';
import RestrictedRoute from './components/routes/RestrictedRoute';

const App = () => {
  const [isSideBarVisible, setSideBarVisible] = useState(false);

  return (
    <div className="App">
      <Router>
        <TitleBar 
          setSideBarVisible={setSideBarVisible}
          />
        <SideBar 
          isSideBarVisible={isSideBarVisible}
          setSideBarVisible={setSideBarVisible}
        />

        <Switch>
          <Route exact path="/" component={Home} />

          <PrivateRoute path="/profile" component={UserProfile} />
          <Route path="/bookmarks" component={Bookmarks} />
          <PrivateRoute path="/edit" component={EditProfile} />

          <RestrictedRoute path="/login" component={Login} />
          <RestrictedRoute path="/register" component={Register} />
          <Route path="/logout" component={Logout} />

        </Switch>

      </Router>

    </div>
  );
}

export default App;
