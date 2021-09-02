import { all, call, fork } from 'redux-saga/effects';
import rehydrateRootSaga from './rehydrate/sagaRegister';
import ethereumRootSaga from './ethereum/sagaRegister';
import binanceRootSaga from './binance/sagaRegister';
import masksDataRootSaga from './masksData/sagaRegister';



const logLocation = 'sagas/rootSaga';
const version = '2.0.0';

export default function* rootSaga(fullApi) {
  const sagas = [
    call(welcomeSaga),
    fork(rehydrateRootSaga()),
    fork(ethereumRootSaga(fullApi)),
    fork(binanceRootSaga(fullApi)),
    fork(masksDataRootSaga(fullApi)),
  ];

  yield all(sagas);
}

function* welcomeSaga() {
  try {
    const style1 = 'background: white; color: black; font-size: 48px;';
    const style2 = 'font-size: 18px;';
    console.log('========================================================================================');
    console.log(`%c Version ${version}`, style2);
    console.log('========================================================================================');
    console.log('%c CosmoMasks ', style1);
    console.log('========================================================================================');
    console.log('%c This browser feature is intended for developers.', style2);
    console.log('%c If someone told you to copy-paste something here,', style2);
    console.log('%c it is a scam and will give them access to your money!', style2);
    console.log('========================================================================================');
  } catch (error) {
    console.error(logLocation, 'welcomeSaga()', error);
  }
  yield true;
}
