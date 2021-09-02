import * as AT from './actionTypes';



export const clear = () => ({
  type: AT.CLEAR,
});

export const update = () => ({
  type: AT.UPDATE,
});

export const updateBlockNumber = () => ({
  type: AT.UPDATE_BLOCK_NUMBER,
});

export const setBlockNumber = (data) => ({
  type: AT.SET_BLOCK_NUMBER,
  payload: data,
});

export const setEndpoint = (data) => ({
  type: AT.SET_ENDPOINT,
  payload: data,
});
