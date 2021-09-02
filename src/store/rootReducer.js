import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { isMobile } from 'react-device-detect';
import storage from 'redux-persist/lib/storage';
import localforage from 'localforage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import rehydrate from './rehydrate/reducers';
import ethereum from './ethereum/reducers';
import binance from './binance/reducers';
import masksData from './masksData/reducers';



export const createRootReducer = () => {
  const rootReducer = combineReducers({
    rehydrate,
    ethereum,
    binance,
    masksData: isMobile ? masksData : persistReducer(
      { key: 'masksData', storage: localforage, stateReconciler: autoMergeLevel1, },
      masksData
    ),
  });

  return rootReducer;
};

export default createRootReducer;
