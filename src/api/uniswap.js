import { powerAddress, cosmoAddress } from '../constants/index';
import BigNumber from 'bignumber.js';
import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk';



const usdtAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';



export default ({
  ethProvider,
}) => {
  const COSMO = new Token(ChainId.MAINNET, cosmoAddress, 18);
  const POWER = new Token(ChainId.MAINNET, powerAddress, 18);
  const USDT = new Token(ChainId.MAINNET, usdtAddress, 6);
  const WETH2 = WETH[ChainId.MAINNET];

  const getPair = async (token1, token2) => {
    const pair = await Fetcher.fetchPairData(token1, token2, ethProvider);
    return pair;
  }

  const getRoute = async (token1, token2) => {
    const pair = await getPair(token1, token2);
    const route = new Route([pair], token2);
    return route;
  }


  const getRouteUsdtWEth = async () => {
    const route = await getRoute(USDT, WETH2);
    return route;
  }


  const getRouteWEthCosmo = async () => {
    const route = await getRoute(WETH2, COSMO);
    return route;
  }

  const getRouteUsdtCosmo = async () => {
    const route = await getRoute(USDT, COSMO);
    return route;
  }
  const getRoutePowerCosmo = async () => {
    const route = await getRoute(POWER, COSMO);
    return route;
  }

  const getPriceCosmoUsdt = async () => {
    const route = await getRouteUsdtCosmo();
    return route.midPrice.toSignificant(15);
  }

  const getPriceCosmoPower = async () => {
    const route = await getRoutePowerCosmo();
    return route.midPrice.invert().toSignificant(15);
  }

  const getPricePower = async () => {
    const cosmoUsdt = await getPriceCosmoUsdt();
    const cosmoPower = await getPriceCosmoPower();
    return new BigNumber(cosmoUsdt).multipliedBy(new BigNumber(cosmoPower)).toFixed(15);
  }

  return {
    getPair, getRoute,

    getRouteUsdtWEth,

    getRouteWEthCosmo,
    getRouteUsdtCosmo,
    getRoutePowerCosmo,

    getPriceCosmoUsdt, getPriceCosmoPower,
    getPricePower,
  };
}
