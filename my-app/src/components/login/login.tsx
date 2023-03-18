import { Field, Formik, Form } from 'formik';
import { useState } from 'react';
import eye from './img/eye.png';

import './login.scss';

export const Login = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showPassword = () => {
    setIsVisible((prev: boolean) => !prev);
  };
  interface onSubmitType {
    email: string;
    password: string;
  }

  const initialValues = { email: '', password: '' };
  const handleSubmit = (data: onSubmitType) => {
    console.log(data);
  };

  return (
    <div className='form-container'>
      <h2>Login</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form className='form-container__form'>
            <div className='label-container'>
              <label htmlFor='email'>E-mail</label>
              <Field
                className='form-container__field'
                id='email'
                name='email'
                placeholder='E-mail'
              />
            </div>

            <div className='label-container'>
              <div onClick={showPassword} className='label-container-password'>
                <img
                  className='label-container-password__eye'
                  src={eye}
                  alt='Show password'
                />
              </div>
              <label htmlFor='password'>Password</label>

              <Field
                type={!isVisible ? 'password' : 'text'}
                className='form-container__field'
                id='password'
                name='password'
                placeholder='Password'
              />
            </div>
            <button className='form-container__button' type='submit'>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
