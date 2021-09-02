import React from 'react';
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable';
import { Routes } from './helper';
import Loading from '../components/Loading';
import { ErrorBoundary } from '../components/ErrorBoundary';



const delay = 200;

const MainPage = Loadable({
  loader: () => import('../pages/Main'),
  loading: Loading,
  delay,
});
const Gallery = Loadable({
  loader: () => import('../pages/Gallery'),
  loading: Loading,
  delay,
});
const Cmp = Loadable({
  loader: () => import('../pages/Cmp'),
  loading: Loading,
  delay,
});
const Wallet = Loadable({
  loader: () => import('../pages/Wallet'),
  loading: Loading,
  delay,
});
const Buy = Loadable({
  loader: () => import('../pages/Buy'),
  loading: Loading,
  delay,
});
const Details = Loadable({
  loader: () => import('../pages/Details'),
  loading: Loading,
  delay,
});


const PageFAQ = Loadable({
  loader: () => import('../pages/PageFAQ'),
  loading: Loading,
  delay,
});
const PageLegalDisclaimer = Loadable({
  loader: () => import('../pages/PageLegalDisclaimer'),
  loading: Loading,
  delay,
});
const PageLegalGrants = Loadable({
  loader: () => import('../pages/PageLegalGrants'),
  loading: Loading,
  delay,
});
const PageLegalPrivacy = Loadable({
  loader: () => import('../pages/PageLegalPrivacy'),
  loading: Loading,
  delay,
});
const PageLegalTerms = Loadable({
  loader: () => import('../pages/PageLegalTerms'),
  loading: Loading,
  delay,
});


const PageNotFound = Loadable({
  loader: () => import('../pages/NotFound'),
  loading: Loading,
  delay,
});


const Unavailable = Loadable({
  loader: () => import('../pages/Unavailable'),
  loading: Loading,
  delay,
});


export const AppRouter = () => (
  <ErrorBoundary>
    <Switch>
      <Route exact path={Routes.main} component={MainPage} />
      <Route exact path={Routes.gallery} component={Gallery} />
      <Route exact path={Routes.buy} component={Buy} />
      <Route exact path={Routes.cmp} component={Cmp} />
      <Route exact path={Routes.details} component={Details} />
      <Route exact path={Routes.wallet} component={Wallet} />

      <Route exact path={Routes.faq} component={PageFAQ} />
      <Route exact path={Routes.disclaimer} component={PageLegalDisclaimer} />
      <Route exact path={Routes.grants} component={PageLegalGrants} />
      <Route exact path={Routes.privacy} component={PageLegalPrivacy} />
      <Route exact path={Routes.terms} component={PageLegalTerms} />

      <Route exact path={Routes.unavailable} component={Unavailable} />
      <Route component={PageNotFound} />
    </Switch>
  </ErrorBoundary>
);
