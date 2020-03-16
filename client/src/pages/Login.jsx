import React, { useState } from 'react'
import { Form, Message, Icon } from 'semantic-ui-react'
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import PrimaryButton from '../components/base/PrimaryButton';

const Login = (props) => {
  const [data, setData] = useState({});
  const [loginError, setLoginError] = useState('');
  const { login } = useAuth();
  const history = useHistory();
  const { from } = props.location.state || { from: { pathname: "/" } };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(data);
      history.push(from);
    } catch (error) {
      setLoginError(error.message); 
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  return (
    <div className="page__container">
      <Message attached='bottom' warning>
        <Icon name='help' />
          Not Registered? 
        <Link to="/register"> Sign up here </Link> instead.
      </Message>

      {loginError && 
        <Message attached='bottom' negative>
          <Icon name='warning sign' />
          { loginError }
        </Message>
      }

      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Username</label>
          <input type="text" name="username" id="username" onChange={handleChange}/>  
        </Form.Field> 
        <Form.Field>
          <label>Password</label>
          <input type="text" name="password" id="username" onChange={handleChange}/>  
        </Form.Field> 

        <PrimaryButton type="submit" content="Login" />
      </Form>
    </div>
  )
}

export default Login
