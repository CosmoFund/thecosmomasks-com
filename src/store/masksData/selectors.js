import { getIn } from 'immutable';
import _ from 'lodash';



const root = 'masksData';

export const getData = (state) =>
  getIn(state, [root, 'data'], []);

export const getDataLength = (state) => {
  const data = getData(state);
  return data.length;
}

export const isLoaded = (state) =>
  getIn(state, [root, 'loaded'], []);

export const findMaskById = (masks, id) => {
  const isMatch = (data) => {
    return data.index === parseInt(id);
  };
  const result = _.filter(masks, isMatch);
  if (result.length > 0)
    return result[0];
  return null;
}

export const getMaskDataById = (state, id) => {
  const masks = getData(state);
  return findMaskById(masks, id);
}
