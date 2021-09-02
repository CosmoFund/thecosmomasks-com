import { setIn } from 'immutable';
import * as AT from './actionTypes';



const initialState = {
  blockNumber: -1,
  endpoint: null,
};


function ethereumReducer(state = initialState, action = {},) {
  const { type, payload } = action;

  switch (type) {
    case AT.CLEAR: {
      return initialState;
    }

    case AT.SET_BLOCK_NUMBER: {
      if (state.blockNumber < payload)
        return setIn(state, ['blockNumber'], payload);
      else return state;
    }

    case AT.SET_ENDPOINT: {
      return setIn(state, ['endpoint'], payload);
    }

    default:
      return state;
  }
}

export default ethereumReducer;
