import React, { useState, useEffect } from 'react'
import { Button, Loader } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import Post from '../components/base/Post'
import CreatePost from '../components/base/CreatePost';
import { useUser } from '../context/user-context';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';
import EmptyPage from '../components/base/EmptyPage';

const Home = () => {
  const [isNewPostModalVisible, setNewPostModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const { user } = useUser();

  const handleNewPostModal = () => {
    if (_isEmpty(user)) {
      history.push('/login');
    } else {
      setNewPostModalVisible(true)
    }
  }

  useEffect(() => {
    getAllPosts();
  }, [])

  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      const posts = await api.get('/posts');
      setPosts(posts.data)
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false)
    }
  };

  const createPost = async (formData) => {
    try {
      await api.post('/posts', formData);
      await getAllPosts();
    } catch (error) {
      console.error(error);
    }
  }

  const createBookmark = async (postId) => {
    if (!user) 
      useHistory.push('/login');
    try {
      await api.post(`/posts/${postId}/bookmark`);
    } catch (error) {
      console.error(error);
    }
  }

  // Add method to delete bookmark

  const renderPosts = () => {
    return posts.map(post => <Post key={post.postId} data={post} createBookmark={createBookmark} />)
  }

  if (isLoading) return <Loader size="medium" active>Loading</Loader>
  return (
    <div className="page__container">
      { posts.length ? renderPosts() : <EmptyPage content="No posts yet" />}
      <Button 
        circular 
        icon='pencil alternate' 
        className='create-post__button'
        onClick={handleNewPostModal}
      />
      <CreatePost
        isVisible={isNewPostModalVisible}
        setIsVisible={setNewPostModalVisible} 
        createPost={createPost}
      />
    </div>
  )
}
export default Home;