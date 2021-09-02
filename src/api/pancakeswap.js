import { powerBscAddress, cosmoBscAddress } from '../constants/index';
import BigNumber from 'bignumber.js';
import { ChainId, Token, Fetcher, Route } from '@pancakeswap-libs/sdk-v2';


const wbnbBscAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const usdtBscAddress = '0x55d398326f99059fF775485246999027B3197955';
const ethBscAddress = '0x2170Ed0880ac9A755fd29B2688956BD959F933F8';


export default ({
  bscProvider,
}) => {
  const WBNB = new Token(ChainId.MAINNET, wbnbBscAddress, 18);
  const USDT = new Token(ChainId.MAINNET, usdtBscAddress, 18);
  const ETH = new Token(ChainId.MAINNET, ethBscAddress, 18);
  const COSMO = new Token(ChainId.MAINNET, cosmoBscAddress, 18);
  const POWER = new Token(ChainId.MAINNET, powerBscAddress, 18);


  const getBscPair = async (token1, token2) => {
    const pair = await Fetcher.fetchPairData(token1, token2, bscProvider);
    return pair;
  }

  const getBscRoute = async (token1, token2) => {
    const pair = await getBscPair(token1, token2);
    const route = new Route([pair], token2);
    return route;
  }


  const getBscRouteUsdtBnb = async () => {
    const route = await getBscRoute(USDT, WBNB);
    return route;
  }
  const getBscRouteUsdtWEth = async () => {
    const route = await getBscRoute(USDT, ETH);
    return route;
  }


  const getBscRouteBnbCosmo = async () => {
    const route = await getBscRoute(WBNB, COSMO);
    return route;
  }
  const getBscRouteWEthCosmo = async () => {
    const route = await getBscRoute(ETH, COSMO);
    return route;
  }

  const getBscRouteUsdtCosmo = async () => {
    const route = await getBscRoute(USDT, COSMO);
    return route;
  }
  const getBscRoutePowerCosmo = async () => {
    const route = await getBscRoute(POWER, COSMO);
    return route;
  }


  const getBscPriceCosmoUsdt = async () => {
    const route = await getBscRouteUsdtCosmo();
    return route.midPrice.toSignificant(15);
  }

  const getBscPriceCosmoPower = async () => {
    const route = await getBscRoutePowerCosmo();
    return route.midPrice.invert().toSignificant(15);
  }

  const getBscPricePower = async () => {
    const cosmoUsdt = await getBscPriceCosmoUsdt();
    const cosmoPower = await getBscPriceCosmoPower();
    return new BigNumber(cosmoUsdt).multipliedBy(new BigNumber(cosmoPower)).toFixed(15);
  }

  return {
    getBscPair, getBscRoute,

    getBscRouteUsdtBnb,
    getBscRouteUsdtWEth,

    getBscRouteBnbCosmo,
    getBscRouteWEthCosmo,
    getBscRouteUsdtCosmo,
    getBscRoutePowerCosmo,

    getBscPriceCosmoUsdt, getBscPriceCosmoPower,
    getBscPricePower,
  };
}
