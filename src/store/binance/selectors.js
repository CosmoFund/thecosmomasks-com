import { getIn } from 'immutable';



const root = 'binance';

export const getBlockNumber = (state) =>
  getIn(state, [root, 'blockNumber'], -1);

export const getEndpoint = (state) =>
  getIn(state, [root, 'endpoint'], null);
