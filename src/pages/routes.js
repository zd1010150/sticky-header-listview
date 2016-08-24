import Skeleton from 'components/Skeleton';
import loadHome from './home';
import Widgets from './widgets';

export const createRoutes = (store) => ({
  path: '/',
  component: Skeleton,
  indexRoute: { component: loadHome(store) },
  childRoutes: [{
    path: '/widgets',
    component: Widgets,
  }],
});

export default createRoutes;
