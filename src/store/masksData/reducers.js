import { setIn } from 'immutable';
import * as AT from './actionTypes';



const initialState = {
  data: [],
  loaded: false,
  loading: false,
};


function masksData(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case AT.CLEAR: {
      return initialState;
    }

    case AT.SET_LOADING: {
      return setIn(state, ['loading'], true);
    }

    case AT.SET_LOADING_SUCCESSFUL: {
      return setIn(state, ['loading'], false);
    }

    case AT.SET_LOADING_FAILURE: {
      return setIn(state, ['loading'], false);
    }

    case AT.SET_DATA: {
      if (Array.isArray(payload)) {
        return setIn(state, ['data'], payload);
      }
      return state;
    }

    case AT.SET_LOADED: {
      return setIn(state, ['loaded'], true);
    }

    default:
      return state;
  }
}

export default masksData;
