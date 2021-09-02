import { put } from 'redux-saga/effects';
import * as A from './actions';



const logLocation = 'sagas/ethereum/sagas';

export default ({ api, }) => {

  const clearSaga = function* () {
    yield put(A.clear());
  }

  const updateBlockNumberSaga = function* () {
    try {
      const blockNumber = yield api.ethProvider.getBlockNumber();
      yield put(A.setBlockNumber(blockNumber));
    } catch (error) {
      yield console.error(logLocation, 'updateBlockNumberSaga()', error);
    }
  }

  const updateSaga = function* () {
    try {
      yield updateBlockNumberSaga();
    } catch (error) {
      yield console.error(logLocation, 'updateSaga()', error);
    }
  }

  return {
    clearSaga,
    updateSaga,
    updateBlockNumberSaga,
  }
}

