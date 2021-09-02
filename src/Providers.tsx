import React, { Suspense } from 'react';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import localforage from 'localforage';
import { NetworkContextName } from './constants/index';
import getLibrary from './utils/getLibrary';
import configureStore from './store';
import { ModalProvider } from './modal/ModalProvider';
import i18n from './i18n';
import Loading from './components/Loading';



localforage.config({
  name: 'TheCosmoMasks.com',
  version: 2.0,
  storeName: 'keyValuePairs',
  description: 'some description',
});


const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const { store, persistor } = configureStore();
const Providers: React.FC = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <StoreProvider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
              <I18nextProvider i18n={i18n}>
                <ModalProvider>
                  {children}
                </ModalProvider>
              </I18nextProvider>
            </PersistGate>
          </StoreProvider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </Suspense>
  );
}

export default Providers;
