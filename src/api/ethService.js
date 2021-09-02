import { ethers } from 'ethers';
import * as A from '../store/actions';



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const ethEndpoints = [
  'https://nodes-eth-1.cosmofund.space/',
  'https://nodes-eth-1.cosmofund.space/',
];

let ethEndpoint = null;
let ethProvider = null;

export default ({ dispatch }) => {
  ethEndpoint = ethEndpoints[getRandomInt(ethEndpoints.length)];
  dispatch(A.ethereum.setEndpoint(ethEndpoint));

  ethProvider = new ethers.providers.JsonRpcProvider(ethEndpoint);
  ethProvider.pollingInterval = 30000;

  ethProvider.on('block', (blockNumber) => {
    dispatch(A.ethereum.setBlockNumber(blockNumber));
  });

  ethProvider.on('error', (error) => {
    console.error('ethProvider on error', error);
  });

  ethProvider.on('disconnect', () => {
    console.log('ethProvider on disconnect');
  });

  return {
    ethProvider,
  };
}
