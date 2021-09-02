import { setIn } from 'immutable';
import { isMobile } from 'react-device-detect';
import * as AT from './actionTypes';



const initialState = {
  masksData: isMobile,
};


function rehydrateReducer(state = initialState, action = {},) {
  const { type, payload } = action;

  switch (type) {
    case AT.CLEAR: {
      return initialState;
    }

    case AT.SET_PERSIST_REHYDRATE: {
      return setIn(state, [payload], true);
    }

    default:
      return state;
  }
}

export default rehydrateReducer;
