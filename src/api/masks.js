import { ethers, Contract, BigNumber, utils } from 'ethers';
import masksAbi from '../constants/abis/masks.json';
import powerAbi from '../constants/abis/power.json';
import { masksAddress, powerAddress } from '../constants/index';



export default ({
  rootUrl,
  apiUrl,
  get,
  post,
  ethProvider,
}) => {

  const loadMasks = () => {
    return get({
      url: rootUrl,
      endPoint: `/masks.json`,
      ignoreQueryParams: true,
    });
  }

  const loadIpfs = (cid) => {
    return get({
      url: 'https://ipfs.io',
      endPoint: '/ipfs/' + cid,
      ignoreQueryParams: true,
    });
  }

  const getEthBalance = async (account) => {
    return ethProvider.getBalance(account).then((res) => {
      return utils.formatEther(res);
    });
  }

  // Masks
  const masksContract = new Contract(masksAddress, masksAbi, ethProvider);

  const getMaskOwnerByIndex = async (maskIndex) => {
    return masksContract.ownerOf(maskIndex);
  }

  const getMaskNameByIndex = async (maskIndex) => {
    return masksContract.tokenNameByIndex(maskIndex);
  }

  const getMasksBalanceOf = async (account) => {
    return masksContract.balanceOf(account).then((res) => {
      return parseInt(utils.formatUnits(res, 'wei'));
    });
  }

  const getMasksTokenOfOwnerByIndex = async (account, index) => {
    return masksContract.tokenOfOwnerByIndex(account, index);
  }

  const getMasksListByOwner = async (account) => {
    const balance = await getMasksBalanceOf(account);
    const masksList = [];
    let i = 0;
    while (i < balance) {
      let masksId = await getMasksTokenOfOwnerByIndex(account, i);
      masksId = parseInt(utils.formatUnits(masksId, 'wei'));
      masksList.push(masksId);
      i++;
    }
    return masksList;
  }

  // Mask rename
  const isMaskNameValid = (maskName) => {
    return masksContract.validateName(maskName);
  }

  const isMaskNameReserved = (maskName) => {
    return masksContract.isNameReserved(maskName);
  }

  const changeMaskNameWithSigner = (maskIndex, maskName, signer) => {
    const masksContractConnected = masksContract.connect(signer);
    return masksContractConnected.changeName(maskIndex, maskName);
  }


  // Mask Buy
  const getMasksStartingIndex = () => {
    return masksContract.startingIndex();
  }

  const getMaskPrice = () => {
    return masksContract.getPrice().then((res) => {
      return utils.formatEther(res);
    });
  }

  const getMasksMaxSupply = () => {
    return masksContract.MAX_SUPPLY();
  }

  const getMasksTotalSupply = () => {
    return masksContract.totalSupply();
  }

  const buyMasksWithSigner = async (amountEth, numberOfMasks, signer) => {
    const parameters = {
      value: utils.parseEther(amountEth.toString()),
    };
    const masksContractConnected = masksContract.connect(signer);
    return masksContractConnected.mint(numberOfMasks, parameters);
  }


  // Power
  const powerContract = new Contract(powerAddress, powerAbi, ethProvider);

  const getPowerBalanceOf = async (account) => {
    return powerContract.balanceOf(account).then((res) => {
      return utils.formatEther(res);
    });
  }

  const getPowerAccumulated = async (maskId) => {
    return powerContract.accumulated(maskId).then((res) => {
      return utils.formatEther(res);
    });
  }

  const getPowerLastClaim = async (maskId) => {
    return powerContract.lastClaim(maskId).then((res) => {
      return parseInt(utils.formatUnits(res, 'wei'));
    });
  }


  const getPowerAccumulatedByMaskList = async (masksList = []) => {
    let amountSum = BigNumber.from(0);
    if (masksList.length > 0) {
      for (let i in masksList) {
        let amount = await powerContract.accumulated(masksList[i]);
        amountSum = amountSum.add(amount);
      }
    }
    amountSum = utils.formatEther(amountSum);
    return amountSum;
  }

  const claimAccumulatedPowerWithSigner = (maskIds = [], signer) => {
    const powerContractConnected = powerContract.connect(signer);
    return powerContractConnected.claim(maskIds);
  }


  return {
    loadMasks,
    loadIpfs,
    getEthBalance,

    getMaskOwnerByIndex,
    getMaskNameByIndex,
    getMasksBalanceOf,
    getMasksTokenOfOwnerByIndex,
    getMasksListByOwner,

    isMaskNameValid, isMaskNameReserved, changeMaskNameWithSigner,

    getMasksStartingIndex,
    getMasksMaxSupply,
    getMasksTotalSupply,
    getMaskPrice,
    buyMasksWithSigner,

    getPowerBalanceOf,
    getPowerAccumulated,
    getPowerLastClaim,
    getPowerAccumulatedByMaskList,
    claimAccumulatedPowerWithSigner,
  };
}
