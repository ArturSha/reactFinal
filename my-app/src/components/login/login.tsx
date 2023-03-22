import { CircularProgress } from '@mui/material';
import { Field, Formik, Form } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from '../../redux/reducers/authReducer';
import { AppDispatch, useAppSelector } from '../../redux/store';
import { Container } from '../common/container';
import eye from './img/eye.png';

import './login.scss';

export const Login = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const error = useAppSelector((state) => state.authReducer.error);
  const loading = useAppSelector((state) => state.authReducer.loading);

  const showPassword = () => {
    setIsVisible((prev: boolean) => !prev);
  };
  interface onSubmitType {
    email: string;
    password: string;
  }

  const initialValues = { email: '', password: '' };
  const handleSubmit = (data: onSubmitType) => {};

  return (
    <div className='form-container'>
      <>
        {loading && (
          <Container className='form-container-overlay'>
            <CircularProgress />
          </Container>
        )}
        <h2>Login</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values }) => (
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
                <div
                  onClick={showPassword}
                  className={
                    !isVisible
                      ? 'label-container-password'
                      : 'label-container-password visible'
                  }
                >
                  <img
                    className='label-container-password__eye'
                    src={eye}
                    alt='Show password'
                  />
                </div>
                <label htmlFor='password'>Password</label>

                <Field
                  autoComplete='on'
                  type={!isVisible ? 'password' : 'text'}
                  className='form-container__field'
                  id='password'
                  name='password'
                  placeholder='Password'
                />
              </div>

              <button
                onClick={() => {
                  dispatch(getToken(values.password));
                }}
                className='form-container__button'
                type='submit'
              >
                Login
              </button>
            </Form>
          )}
        </Formik>

        {error && (
          <Container
            className={'form-container__error'}
            children={error}
          ></Container>
        )}
      </>
    </div>
  );
};
