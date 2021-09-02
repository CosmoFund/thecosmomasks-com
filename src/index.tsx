import React from 'react';
import ReactDOM from 'react-dom';
import Providers from './Providers';
import App from './App';
import './i18n';
import 'semantic-ui-css/semantic.min.css';
import './overwrite.scss';
import './styles.scss';



if ('ethereum' in window) {
  //(window.ethereum as any).autoRefreshOnNetworkChange = false;
  (window.ethereum as any).on('chainChanged', () => window.location.reload());
  (window.ethereum as any).on('networkChanged', () => window.location.reload());
  (window.ethereum as any).on('accountsChanged', () => window.location.reload());
}

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')
);
