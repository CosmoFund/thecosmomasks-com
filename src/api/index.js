import httpService from './http';
import ethService from './ethService';
import bscService from './bscService';
import masks from './masks';
import uniswap from './uniswap';
import pancakeswap from './pancakeswap';



const api = ({
  options,
  apiKey,
  dispatch,
}) => {
  const rootUrl = options.domains.root;
  const apiUrl = options.domains.api;
  const http = httpService({ apiKey, });
  const eth = ethService({ dispatch });
  const bsc = bscService({ dispatch });

  const baseApi = {
    rootUrl,
    apiUrl,
    ...http,
    //...eth,
    //...bsc,
  };

  return {
    ...http,
    ...eth,
    ...bsc,
    ...masks({ ...baseApi, ...eth, }),
    ...uniswap({ ...baseApi, ...eth, }),
    ...pancakeswap({ ...baseApi, ...bsc, }),
  };
}

export default api;
