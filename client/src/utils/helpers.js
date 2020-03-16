import defaultUserImage from '../images/default-user.png';

export const getUserImage = (currentUser, tempImageURL = '') => {
  if (tempImageURL) 
    return tempImageURL;
  else if (currentUser && currentUser.imageUrl) 
    return `http://localhost:3001/${currentUser.imageUrl}`;
  else 
    return defaultUserImage;
}