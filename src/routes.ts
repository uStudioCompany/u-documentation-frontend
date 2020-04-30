import { RouteProps } from 'react-router-dom';
import { DocsPage } from './pages/docs';

import { repo } from '../config.json';

export const routes: RouteProps[] = [
  { path: `/${encodeURI(repo.docsFolder)}/:path*/:docName`, component: DocsPage },
].map((route) => ({
  ...route,
  exact: true,
}));
