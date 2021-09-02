import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import localforage from 'localforage';
import { isMobile } from 'react-device-detect'
import createEnhancers, { sagaMiddleware } from './enhancers';
import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';
import createApi from '../api';
import { isProduction } from '../constants/index';
import * as A from './actions';



const persistConfig = {
  key: 'store',
  storage: localforage,
  whitelist: [],
  stateReconciler: autoMergeLevel1,
};

export let api;


const initialState = {};

export const configureStore = (preloadedState = {}) => {
  const store = createStore(
    persistReducer(persistConfig, createRootReducer()),
    Object.assign({}, initialState, preloadedState),
    createEnhancers(),
  );
  const persistor = persistStore(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(persistReducer(persistConfig, createRootReducer()));
    });
  }

  const options = {
    domains: {
      root: isProduction ? 'https://thecosmomasks.com' : `http://${window.location.hostname}:3000`,
      api: isProduction ? 'https://api.cosmofund.space' : `http://${window.location.hostname}:3100`,
    }
  };
  const apiOptions = { apiKey: null, options, };

  api = createApi({
    ...apiOptions,
    dispatch: store.dispatch,
  });
  sagaMiddleware.run(rootSaga, { api, options });

  return { store, persistor };
}

export default configureStore;
