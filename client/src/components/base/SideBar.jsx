import React from 'react'
import { Link } from 'react-router-dom';
import { Sidebar, Menu, Image, Header, Divider } from 'semantic-ui-react';
import { getUserImage } from '../../utils/helpers';
import { useUser } from '../../context/user-context'

const SideBar = ({ isSideBarVisible, setSideBarVisible }) => {
  const { user, isLoggedIn } = useUser();
  return (
    <div className="sidebar__wrapper">
      <Sidebar
        as={Menu}
        direction='right'
        animation='overlay'
        icon='labeled'
        inverted
        onHide={() => setSideBarVisible(false)}
        vertical
        visible={isSideBarVisible}
        width='wide'
        className='sidebar__container'
        onClick={() => setSideBarVisible(false)}
      >
        <Link to="/profile">
          <div className="sidebar__profile-card">
            <Image className="sidebar__profile-image" circular size='mini' src={getUserImage(user)} />
            <div className="sidebar__profile-meta">
              { isLoggedIn && user.name && <Header as="h3">{user.name}</Header> }
              { isLoggedIn && user.username ? <p>@{user.username}</p> : <p>Login / Create Account</p> }
            </div>
          </div>
        </Link>

        <Divider />

        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
       
        <Menu.Item as={Link} to="/profile">
          Profile
        </Menu.Item>

        { isLoggedIn &&
          <Menu.Item as={Link} to="/bookmarks">
            Bookmarks
          </Menu.Item>
        }

        {isLoggedIn && 
          <Menu.Item as={Link} to="/logout">
            Logout
          </Menu.Item>
        }
      </Sidebar>
    </div>
  )
}

export default SideBar
