import { put, select } from 'redux-saga/effects';
import * as A from './actions';
import * as S from './selectors';



const logLocation = 'sagas/masksData/sagas';

export default ({ api, }) => {

  const clearSaga = function* () {
    yield put(A.clear());
  }

  const updateSaga = function* () {
    const dataLength = yield select(S.getDataLength);
    if (dataLength > 0) {
      yield put(A.setLoaded());
      return;
    }
    yield put(A.setLoading());
    try {
      const res = yield api.loadMasks();
      if (Array.isArray(res)) {
        yield put(A.setLoadingSuccessful());
        yield put(A.setData(res));
        yield put(A.setLoaded());
        return;
      }
    } catch (error) {
      yield console.error(logLocation, 'updateSaga()', error);
    }
    yield put(A.setLoadingFailure());
  }

  return {
    clearSaga,
    updateSaga,
  }
}

