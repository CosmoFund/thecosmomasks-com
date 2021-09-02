import * as AT from './actionTypes';



export const clear = () => ({
  type: AT.CLEAR,
});

export const update = () => ({
  type: AT.UPDATE,
});

export const setLoading = () => ({
  type: AT.SET_LOADING,
});

export const setLoadingSuccessful = () => ({
  type: AT.SET_LOADING_SUCCESSFUL,
});

export const setLoadingFailure = () => ({
  type: AT.SET_LOADING_FAILURE,
});

export const setData = (data) => ({
  type: AT.SET_DATA,
  payload: data,
});

export const setLoaded = () => ({
  type: AT.SET_LOADED,
});
