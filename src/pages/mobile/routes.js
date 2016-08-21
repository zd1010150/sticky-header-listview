import Skeleton from 'components/Skeleton';
import loadFocus from './Focus';

export const createRoutes = (store) => ({
  path: '/',
  component: Skeleton,
  indexRoute: { component: loadFocus(store) },
});

export default createRoutes;
