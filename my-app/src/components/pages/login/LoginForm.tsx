import { CircularProgress } from '@mui/material';
import { Field, Formik, Form } from 'formik';
import { useState } from 'react';
import { getToken } from '../../../redux/reducers/auth/authReducer';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Container } from '../../common/container/Сontainer';
import eye from '../../images/eye.png';
import { useTranslation } from '../../../hooks/useTranslations';

import './loginForm.scss';

export const LoginForm = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.authReducer.error);
  const loading = useAppSelector((state) => state.authReducer.loading);

  const showPassword = () => {
    setIsVisible((prev: boolean) => !prev);
  };
  interface onSubmitType {
    login: string;
    password: string;
  }

  const initialValues = { login: '', password: '' };
  const handleSubmit = (data: onSubmitType) => {};

  return (
    <Container className='form-container'>
      {loading && (
        <Container className='form-container-overlay'>
          <CircularProgress sx={{ color: 'gold' }} />
        </Container>
      )}
      <h2>{t.loginPage.header}</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className='form-container__form'>
            <div className='label-container'>
              <label htmlFor='login'>{t.loginPage.login}</label>
              <Field
                className='form-container__field'
                id='login'
                name='login'
                placeholder='Login'
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
              <label htmlFor='password'>{t.loginPage.password}</label>

              <Field
                autoComplete='on'
                type={!isVisible ? 'password' : 'text'}
                className='form-container__field'
                id='password'
                name='password'
                placeholder={t.loginPage.password}
              />
            </div>

            <button
              onClick={() => {
                dispatch(
                  getToken({
                    username: values.login,
                    password: values.password,
                  })
                );
              }}
              className='form-container__button'
              type='submit'
            >
              {t.loginPage.submit}
            </button>
          </Form>
        )}
      </Formik>
      <>
        {error && (
          <div className='form-container__error'>{error as string}</div>
        )}
      </>
    </Container>
  );
};
