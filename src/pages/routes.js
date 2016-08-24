import Skeleton from 'components/Skeleton';
import loadHome from './home';

export const createRoutes = (store) => ({
  path: '/',
  component: Skeleton,
  indexRoute: { component: loadHome(store) },
});

export default createRoutes;
