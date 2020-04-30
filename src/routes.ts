import { RouteProps } from 'react-router-dom';
import { DocsPage } from './pages/docs';

export const routes: RouteProps[] = [{ path: '/docs/:path*/:docName', component: DocsPage }].map((route) => ({
  ...route,
  exact: true,
}));
