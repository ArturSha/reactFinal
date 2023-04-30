import { CircularProgress } from '@mui/material';
import { Container } from '../container/Сontainer';
import './loader.scss';

export const Loader = () => {
  return (
    <Container className='loader-container'>
      {' '}
      <CircularProgress />{' '}
    </Container>
  );
};
