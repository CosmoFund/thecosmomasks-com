// https://github.com/pancakeswap/pancake-swap-interface-v1/blob/master/src/constants/multicall/index.ts
import { ChainId } from '../index';
import MULTICALL_ABI from './abi.json';



const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.ETH_MAINNET]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.ETH_ROPSTEN]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.ETH_KOVAN]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.ETH_RINKEBY]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.ETH_GOERLI]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',

  [ChainId.BSC_MAINNET]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
  [ChainId.BSC_TESTNET]: '0x301907b5835a2d723Fe3e9E8C5Bc5375d5c1236A',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS };
