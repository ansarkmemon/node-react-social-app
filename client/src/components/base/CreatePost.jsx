import React, { useState }  from 'react'
import { Sidebar, Segment, Form, TextArea, Image, Header, Button, Icon } from 'semantic-ui-react';
import { useUser } from '../../context/user-context';
import { getUserImage } from '../../utils/helpers';

let formData = new FormData();

const CreatePost = ({ isVisible, setIsVisible, createPost }) => {
  const [postContent, setPostContent] = useState('');
  const [tempImageURL, setTempImageURL] = useState('');
  const { user } = useUser();

  const handlePostSubmit = async () => {
    formData.set('content', postContent)
    formData.set('userId', user.userId);
    await createPost(formData);
    formData = new FormData();
    setIsVisible(false);
  }

  const handleImageChange = event => {
    const { name, files } = event.target;
    const tempFileURL = URL.createObjectURL(files[0]);
    setTempImageURL(tempFileURL);
    formData.set(name, files[0]);
  }

  const removeImage = (event) => {
    const { name } = event.target;
    setTempImageURL('');
    formData.delete(name);
  }

  return (
    <Sidebar
      as={Segment}
      animation='overlay'
      direction='bottom'
      visible={isVisible}
      onHide={() => setIsVisible(false)}
    >
      <div className="create-post__wrapper">
        <div className="create-post__actions">
          <Icon name='close' onClick={() => setIsVisible(false)}/>
          <Button 
            content='Post' 
            onClick={handlePostSubmit}
            disabled={postContent.length < 1} 
            className="create-post__submit-btn" 
          />
        </div>
        <div className="create-post__topbar">
          <Image circular size="mini" src={getUserImage(user)} />
          <Header as='h3' className="create-post__author">{user.name}</Header>
        </div>
        <Form className="create-post__field">
          <Form.Field
            control={TextArea}
            rows={20}
            value={postContent}
            onChange={evt => setPostContent(evt.target.value)}
            placeholder='Write something, anything at all...Its your day!'
          />

          <section className="create-post__additions">
            <label>
              <Icon name="image" />
              Add an image to your post
              <input type="file" name="image" id="image" onChange={handleImageChange} accept="image/*" />
            </label>
          </section>

          {tempImageURL && 
          <section className="create-post__image-preview">
            <Button circular icon="close" onClick={removeImage} />
            <div style={{ backgroundImage: `url(${tempImageURL})`}} className="preview-box" />
          </section>
          }
        </Form>
      </div>
  </Sidebar> 
  )
}

export default CreatePost;