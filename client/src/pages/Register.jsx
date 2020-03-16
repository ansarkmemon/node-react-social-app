import React, { useState } from 'react';
import { useAuth } from '../context/auth-context'
import * as yup from 'yup';
import { Form, Message, Icon } from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import PrimaryButton from '../components/base/PrimaryButton';

const validationSchemaCallback = data => {
  const validationSchema = yup.object().shape({
    username: yup
              .string()
              .required('Please enter the username'),
    email: yup
            .string()
            .required('Email is a required field')
            .email('Please enter the valid email address'),
    password: yup
              .string()
              .required('Password is a required field')
              .min(6, 'Password needs to be minimum of 6 chars')
  });

  return validationSchema;
};

const validationResolver = data => {
  let validatedValues = {};
  const validationErrors = {};

  try {
    validatedValues = validationSchemaCallback(data).validateSync(data, { abortEarly: false });
  } catch (error) {
    error.inner.forEach(item => (validationErrors[item.path] = item.message))
  }

  return {
    values: validatedValues,
    errors: validationErrors,
  }
}



const Register = () => {
  const { register, handleSubmit, errors } = useForm({ validationResolver, mode: 'onBlur' });
  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const { register: registerUser } = useAuth();
  const history = useHistory();

  const handleRegistration = async data => {
    console.log(data)
    try {
      setIsLoading(true);
      await registerUser(data);
      history.push('/edit');
    } catch (error) {
      setRegistrationError(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="page__container">
      <Message attached='bottom' warning>
        <Icon name='help' />
        Already signed up? 
        <Link to="/login"> Login here </Link> instead.
      </Message>

      { registrationError && 
        <Message attached='bottom' negative>
          <Icon name='warning sign' />
          {registrationError}
        </Message>
      }

      <Form onSubmit={handleSubmit(handleRegistration)}>
        <Form.Field>
          <label htmlFor="username">Username</label>
          <input ref={register} type="text" name="username" id="username"/>
          { errors.username && <p className="field-error">{errors.username}</p> }
        </Form.Field>

        <Form.Field>
          <label htmlFor="email">Email</label>
          <input ref={register} type="email" name="email" id="email" />
          { errors.email && <p className="field-error">{errors.email}</p> }
        </Form.Field>

        <Form.Field>
          <label htmlFor="password">Password</label>
          <input ref={register} type="password" name="password" id="password" />
          { errors.password && <p className="field-error">{errors.password}</p> }
        </Form.Field>

        <PrimaryButton content="Register" type="submit" loading={isLoading}/>
      </Form>
    </div>
  )
}

export default Register
