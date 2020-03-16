import React, { useState, useEffect } from 'react'
import Post from '../components/base/Post'
import { Loader } from 'semantic-ui-react';
import { useUser } from '../context/user-context'
import api from '../utils/api';
import EmptyPage from '../components/base/EmptyPage';


const Bookmarks = () => {
  const { user } = useUser();
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBookmarkedPosts = async (userId) => {
    try {
      setIsLoading(true);
      let posts = await api.get(`/users/${userId}/bookmarks`);
      posts = posts.data.map(post => post.post);
      setBookmarkedPosts(posts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    getBookmarkedPosts(user.userId);
  }, [user])

  if (isLoading) return <Loader active />
  return (
    <div className="page__container">
      { bookmarkedPosts.length ? 
        bookmarkedPosts.map(post => <Post key={post.postId} data={post} />) :
        <EmptyPage content="You have not bookmarked anything" />  
      }
    </div>
  )
}

export default Bookmarks
