import { ethers } from 'ethers';
import * as A from '../store/actions';



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const bscEndpoints = [
  'https://nodes-bsc-1.cosmofund.space/',
  'https://nodes-bsc-1.cosmofund.space/',
  //'https://bsc-dataseed.binance.org/',
  //'https://bsc-dataseed1.defibit.io/',
  //'https://bsc-dataseed1.ninicoin.io/',
  //'https://bsc-dataseed2.defibit.io/',
  //'https://bsc-dataseed3.defibit.io/',
  //'https://bsc-dataseed4.defibit.io/',
  //'https://bsc-dataseed2.ninicoin.io/',
  //'https://bsc-dataseed3.ninicoin.io/',
  //'https://bsc-dataseed4.ninicoin.io/',
  //'https://bsc-dataseed1.binance.org/',
  //'https://bsc-dataseed2.binance.org/',
  //'https://bsc-dataseed3.binance.org/',
  //'https://bsc-dataseed4.binance.org/',
];

let bscEndpoint = null;
let bscProvider = null;

export default ({ dispatch }) => {
  bscEndpoint = bscEndpoints[getRandomInt(bscEndpoints.length)];
  dispatch(A.binance.setEndpoint(bscEndpoint));

  bscProvider = new ethers.providers.JsonRpcProvider(bscEndpoint);
  bscProvider.pollingInterval = 30000;

  bscProvider.on('block', (blockNumber) => {
    dispatch(A.binance.setBlockNumber(blockNumber));
  });

  bscProvider.on('error', (error) => {
    console.error('bscProvider on error', error);
  });

  bscProvider.on('disconnect', () => {
    console.log('bscProvider on disconnect');
  });

  return {
    bscProvider,
  };
};
