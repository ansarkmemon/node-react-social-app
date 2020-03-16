import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container, Header, Image } from 'semantic-ui-react';
import BackIcon from '../../images/back-icon.svg';
import { useUser } from '../../context/user-context';
import { getUserImage } from '../../utils/helpers'

const TitleBar = ({ setSideBarVisible }) => {
  const { pathname } = useLocation();
  const { goBack } = useHistory();
  const { user } = useUser();

  const getTitle = () => pathname.length > 1 ? pathname.slice(1) : 'Feed';
  const isHomePage = pathname === '/';
  return (
    <Container className="titlebar__container" fluid>
      {!isHomePage && 
        <Image 
          src={BackIcon} 
          circular 
          size="mini" 
          alt="back button"
          onClick={goBack}          
        />
      }
      <Header as='h1' className="titlebar__title">{ getTitle() }</Header> 
      <Image 
        onClick={() => setSideBarVisible(true)} 
        src={getUserImage(user)} 
        size='mini' 
        circular
        loading="lazy" 
        className="titlebar__user-image"
      />
    </Container>
  )
}
export default TitleBar;