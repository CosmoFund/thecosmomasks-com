import { generatePath } from 'react-router-dom';



export const Routes = {
  main: '/',
  details: '/details/:id',
  buy: '/buy',
  cmp: '/cmp',
  gallery: '/gallery',
  wallet: '/wallet',

  privacy: '/privacy',
  terms: '/terms',
  grants: '/grants',
  faq: '/faq',
  disclaimer: '/disclaimer',

  unavailable: '/unavailable', // DEMO?
};

export const generateDetailsPath = (id: number | string): string =>
  generatePath(Routes.details, { id });
