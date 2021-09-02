import { takeLatest } from 'redux-saga/effects';
import { takeFirst } from '../lib';
import * as AT from './actionTypes';
import * as RAT from '../rehydrate/actionTypes';
import sagas from './sagas';



export default ({ api, }) => {
  const {
    clearSaga,
    updateSaga,
  } = sagas({
    api,
  });

  return function* profileRootSaga() {
    yield takeFirst(AT.CLEAR, clearSaga);
    yield takeFirst(AT.UPDATE, updateSaga);
    yield takeFirst(RAT.REHYDRATED, updateSaga);
  }
}
