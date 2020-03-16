import React, { useState, useEffect } from 'react'
import _get from 'lodash/get';
import { Form, TextArea, Button, Image, Header, Icon, Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';
import { getUserImage } from '../utils/helpers';
import { useUser } from '../context/user-context'
import { useAuth } from '../context/auth-context'

const formData = new FormData();

const EditProfile = () => {
  const { user } = useUser();
  const { handleUserStorage } = useAuth();
  const [tempImageURL, setTempImageURL] = useState('');
  const [formFields, setFormFields] = useState({});
  const history = useHistory();

  useEffect(() => {
    setFormFields({ 
      name: _get(user, 'name', ''),
      bio: _get(user, 'bio', ''),
      website: _get(user, 'website', '')
    })
  }, [user])

  const onImageChange = event => {
    const { name, files } = event.target;
    const tempFileURL = URL.createObjectURL(files[0]);
    setTempImageURL(tempFileURL);
    formData.append(name, files[0]);
  }

  const handleFieldChange = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const handleSubmit = async event => {
    Object.entries(formFields).forEach(([name, value]) => {
      value && formData.set(name, value);
    });

    try {
      const updatedUser = await api.put(`/users/${user.userId}`, formData);
      handleUserStorage(updatedUser.data);
      setTempImageURL('');
      history.push('/profile');
    } catch (error) { 
      console.error(error.message)
    }
  }

  const handleUserDelete = async userId => {
    try {
      await api.delete(`/users/${userId}`);
      history.push('/'); 
    } catch (error) {
      console.error(error);
      
    }
  }

  return (
    <div className="page__container edit-profile__page">
      <div className="user-profile__details">
        <div className="edit-profile__image">
          <label>
            <Icon name="camera" />
            <input type="file" name="image" id="image" onChange={onImageChange} />
          </label>
          <Image className="user-profile__image" circular size="mini" src={getUserImage(user, tempImageURL)}  />
        </div>
        <div className="user-profile__user-info">
          <Header as='h3'>
            {formFields.name || user.name}
            {user.username && 
              <Header.Subheader>
                @{user.username}
              </Header.Subheader>
            }
          </Header>
        </div>
        <Button 
          content="Save" 
          className="user-profile__edit-btn"
          onClick={handleSubmit}
        />
        <Dropdown
          button
          className="icon circular"
          icon='settings'
          compact
          floating
          direction='left'
        >
          <Dropdown.Menu>
            <Dropdown.Item text='Delete Profile' onClick={() => handleUserDelete(user.userId)} />
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input type="text" className="edit-profile__field" onChange={handleFieldChange} name="name" value={formFields.name || ''} />
        </Form.Field>

        <Form.Field>
          <label>Bio</label>
          <TextArea className="edit-profile__field" name="bio" onChange={handleFieldChange} value={formFields.bio || ''} />
        </Form.Field>

        <Form.Field>
          <label>Website</label>
          <input type="text" className="edit-profile__field" name="website" onChange={handleFieldChange} value={formFields.website || ''} />
        </Form.Field>
      </Form>

      {/* <Button fluid color='red' content='Delete Profile' className="edit-profile__delete-btn" /> */}
    </div>
  )
}

export default EditProfile
