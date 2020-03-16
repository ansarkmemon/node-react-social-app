import React, { useEffect, useState } from 'react'
import { Image, Tab, Header, Button, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import api from '../utils/api';
import { useUser } from '../context/user-context';

import { getUserImage } from '../utils/helpers';
import Post from '../components/base/Post';
import EmptyPage from '../components/base/EmptyPage';

const UserProfile = () => {
  const { user } = useUser();
  const [postsByUser, setPostsByUser] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const getPostsByCurrentUser = async (userId) => {
    try {
      let posts = await api.get(`/users/${userId}/posts`);
      posts = posts.data.map(post => ({...post, user }));
      setPostsByUser(posts);
    } catch (error) {
      console.error(error.message);
    }
  }

  const getBookmarkedPosts = async (userId) => {
    try {
      let posts = await api.get(`/users/${userId}/bookmarks`);
      posts = posts.data.map(post => post.post);
      setBookmarkedPosts(posts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user.userId) {
      getPostsByCurrentUser(user.userId);
      getBookmarkedPosts(user.userId);
    } else {
      console.log('unknown user ', user);
    }
  }, [user]);

  const panes = [
    {
      menuItem: 'Posts',
      render: () => <Tab.Pane attached={false}>{ 
        postsByUser.length  ?
        postsByUser.map(post => <Post key={post.postId} data={post} />) :
        <EmptyPage content="You have not created posts yet"/>
      }</Tab.Pane>,
    },
    {
      menuItem: 'Bookmarks',
      render: () => <Tab.Pane attached={false}>{ 
        bookmarkedPosts.length  ?
        bookmarkedPosts.map(post => <Post key={post.postId} data={post} />) :
        <EmptyPage content="You have not bookmarked anything"/>
      }</Tab.Pane>,
    },
  ]


  return (
    <div className="page__container">
      <div className="user-profile__details">
        <Image className="user-profile__image" circular size="mini" src={getUserImage(user)} />
        <div className="user-profile__user-info">
          <Header as='h3'>
            { user.name }
            <Header.Subheader>
              @{user.username}
            </Header.Subheader>
          </Header>
        </div>
        <Link to="/edit">
          <Button 
            content="Edit Profile" 
            className="user-profile__edit-btn"
          />
        </Link>
      </div>
      { user.bio && 
        <div className="user-profile__bio">
          <p>{user.bio}</p>
        </div>
      }

      <Divider />

      <Tab className="user-profile__tabs" menu={{ secondary: true, pointing: true }} panes={panes} />

    </div>
  )
}
export default UserProfile;