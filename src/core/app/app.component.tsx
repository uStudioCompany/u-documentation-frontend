import React, { FC, Suspense } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from 'ustudio-ui/theme';

import { repo, name } from '../../../config.json';

import { Layout } from '../../shared/components/layout';
import { FadeIn } from '../../shared/components/fade-in';
import RequestConfig from '../../shared/services/request-config';
import { routes } from '../routes.module';

import type { AppProps } from './app.props';

export const App: FC<AppProps> = ({ palette }) => {
  return (
    <RequestConfig repo={repo} serviceUrl="https://udoc.eprocurement.systems">
      <ThemeProvider override={{ palette }}>
        <HashRouter>
          <FadeIn>
            <Layout name={name} repo={repo}>
              <Suspense fallback={<div />}>
                <Switch>
                  {routes.map((route) => (
                    <Route {...route} key={route.path as string} />
                  ))}
                </Switch>
              </Suspense>
            </Layout>
          </FadeIn>
        </HashRouter>
      </ThemeProvider>
    </RequestConfig>
  );
};
