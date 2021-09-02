import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import {
  Container,
  Grid,
  Header,
  Image,
  Button,
  Progress,
} from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import Page from '../../components/Page';
import Number0 from '../../components/Number0';
import Number4 from '../../components/Number4';
import Number4Tkn from '../../components/Number4Tkn';
import { mobileBreakpoint, getAdaptiveClassName } from '../../helpers/Media';
import { IBuyProps } from './BuyTypes';
import './Buy.scss';
import InputNumber from '../../components/InputNumber/InputNumber';
import getExternalLinkProps from '../../utils/getExternalLinkProps';

import getPowerBonus from '../../utils/getPowerBonus';
import getMaskSoldLeftPrice from '../../utils/getMaskSoldLeftPrice';
import { useEagerConnect, useActiveWeb3React } from '../../hooks/index';
import useAuth from '../../hooks/useAuth';
import { useWalletModal } from '../../modal/WalletModal';
import { useErrorModal } from '../../modal/ErrorModal';
import { useTransactionSendedModal } from '../../modal/TransactionSendedModal';
import { useTransactionConfirmedModal } from '../../modal/TransactionConfirmedModal';

import * as S from '../../store/selectors';
import { api } from '../../store/configureStore';
import BigNumber from 'bignumber.js';



const Buy: React.FC<IBuyProps> = () => {
  const { t } = useTranslation();
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const [isConnected, setIsConnected] = useState(false);

  const triedEager = useEagerConnect();
  const context3 = useActiveWeb3React();
  const { library, chainId, account, active, error } = context3;
  const { login, logout } = useAuth();
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout);
  const { onPresentErrorModal } = useErrorModal();
  const { onPresentTransactionSendedModal } = useTransactionSendedModal();
  const { onPresentTransactionConfirmedModal } = useTransactionConfirmedModal();


  const [maskPrice, setMaskPrice] = useState(0);
  const [maskTotalSupply, setMaskTotalSupply] = useState(0);
  const [maskSoldAtPrice, setMaskSoldAtPrice] = useState(0);
  const [maskLeftAtPrice, setMaskLeftAtPrice] = useState(0);

  const [totalMasks, setTotalMasks] = useState(0);
  const [totalEth, setTotalEth] = useState(0);

  const onChangeMasksAmount = (amount: number) => {
    setTotalMasks(amount);
    setTotalEth(amount * maskPrice);
  }

  const getMasksTotalSupply = async () => {
    if (!api) return;
    try {
      const res = await api.getMasksTotalSupply();
      setMaskTotalSupply(parseInt(res));
    } catch (error) { console.error(error); }
  }


  const [ethBalance, setEthBalance] = useState(0);
  const getEthBalance = async () => {
    if (!api) return;
    try {
      const res = await api.getEthBalance(account);
      setEthBalance(res);
    } catch (error) { console.error(error); }
  }


  const [powerEthPrice, setPowerEthPrice] = useState('0');
  const [powerBscPrice, setPowerBscPrice] = useState('0');
  const [powerPrice, setPowerPrice] = useState('0');

  useEffect(() => {
    let tempPrice = new BigNumber(0);
    let tempPriceItems = 0;
    /*if (parseFloat(powerEthPrice) > 0) {
      tempPrice = tempPrice.plus(powerEthPrice);
      tempPriceItems++;
    }*/
    if (parseFloat(powerBscPrice) > 0) {
      tempPrice = tempPrice.plus(powerBscPrice);
      tempPriceItems++;
    }
    if (tempPriceItems > 1)
      setPowerPrice(tempPrice.dividedBy(tempPriceItems).toFixed(15));
    else
      setPowerPrice(tempPrice.toFixed(15));
  }, [powerEthPrice, powerBscPrice]);


  const getEthPricePower = async () => {
    if (!api) return;
    try {
      const res = await api.getPricePower();
      setPowerEthPrice(res);
    } catch (error) { console.error(error); }
  }

  const ethBlockNumber: number = useSelector((state) => S.ethereum.getBlockNumber(state));
  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    if (updating) return;
    setUpdating(true);
    try {
      getMasksTotalSupply();
      getEthBalance();
      //getEthPricePower();
    } catch (error) { console.error(error); }
    setUpdating(false);
  }, [ethBlockNumber]);


  const getBscPricePower = async () => {
    if (!api) return;
    try {
      const res = await api.getBscPricePower();
      setPowerBscPrice(res);
    } catch (error) { console.error(error); }
  }
  const bscBlockNumber: number = useSelector((state) => S.binance.getBlockNumber(state));
  const [updating2, setUpdating2] = useState(false);
  useEffect(() => {
    if (updating2) return;
    setUpdating2(true);
    try {
      getBscPricePower();
    } catch (error) { console.error(error); }
    setUpdating2(false);
  }, [bscBlockNumber]);

  useEffect(() => {
    const { price, sold, left, } = getMaskSoldLeftPrice(maskTotalSupply);
    setMaskPrice(price);
    setMaskSoldAtPrice(sold);
    setMaskLeftAtPrice(left);
  }, [maskTotalSupply]);


  const [time, setTime] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000)
    return () => {
      clearInterval(intervalId);
    }
  }, []);


  const buyMasks = async () => {
    if (chainId !== 1)
      return onPresentErrorModal({
        message: 'Wrong Network! Switch the Network in the your Wallet!'
      });

    if (!api) return;

    try {
      const signer = library?.getSigner();
      try {
        const TransactionResponse = await api.buyMasksWithSigner(totalEth, totalMasks, signer);
        onPresentTransactionSendedModal(TransactionResponse);
        const TransactionReceipt = await TransactionResponse.wait();
        onPresentTransactionConfirmedModal({ hash: TransactionReceipt.transactionHash });
      } catch (error) { onPresentErrorModal(error); }
    } catch (error) { console.error(error); }
  }


  return (
    <Page title={t('Buy Masks')}>
      <div className={getAdaptiveClassName('buy__header', isMobile)}>
        <Container>
          <Header as='h1' content={t('Buy Masks')} />
          <p>{t('Enjoy collecting!')}</p>
        </Container>
      </div>

      <div className={getAdaptiveClassName('buy', isMobile)}>
        <Container>
          {/*<p className='buy__text-1'>
            <Trans t={t} i18nKey='byOwningMasksYouAccumulate'>
              By owning a CosmoMasks NFT, <br />
              you accumulate a CosmoMasks Power (CMP) <br />
              every day.
            </Trans>
          </p>
          <p className='buy__text-2'>
            <Trans t={t} i18nKey='thatAllowsYouToChooseNameAndEarn'>
              That allows you to choose a name for your NFT
              on the Ethereum Blockchain <br />
              and earn COSMO on the <a
                className='link-blue'
                {...getExternalLinkProps()}
                href='https://cosmoswap.space/'
              >CosmoSwap</a>.
            </Trans>
          </p>*/}

          <Image centered alt='' src='/images/buy/1.png' />
          {/*<p className='buy__text-3'>
            <Trans t={t} i18nKey='eachNftGivesBonus'>
              Each <a
                className='link-orange'
                {...getExternalLinkProps()}
                href='https://opensea.io/collection/cosmomasks-main-collection'
              >CosmoMasks NFT</a>{' '}
              gives you a bonus of
            </Trans>
          </p>
          <p className='buy__text-4'>
            {/*<Number4 value={getPowerBonus() * parseFloat(powerPrice)} prefix='$' />{' '}
            (* /}<Number4Tkn value={getPowerBonus()} />{/*})* /}
          </p>
          <p className='buy__text-5'>
            <Trans t={t} i18nKey='youCanUseBonusFor'>
              which you can use for <a
                className='link-orange'
                {...getExternalLinkProps()}
                href='https://cosmoswap.space/'
              >Yield Farming</a> on <a
                className='link-orange'
                {...getExternalLinkProps()}
                href='https://cosmoswap.space/'
              >CosmoSwap</a>
            </Trans>
          </p>*/}

          <Progress
            progress='percent'
            precision={4}
            value={maskSoldAtPrice}
            total={maskSoldAtPrice + maskLeftAtPrice}
          />
          <p className='buy__text-6'>
            {t('soldPriceLeft', { sold: maskSoldAtPrice, left: maskLeftAtPrice, price: maskPrice })}
          </p>

          {triedEager && active && account ? (
            <Grid columns='equal' stackable padded verticalAlign='middle'>
              <Grid.Column>
                <Image src='/images/buy/3.png' centered alt='' />
              </Grid.Column>
              <Grid.Column>
                <div className='buy__balance'>
                  <a
                    className='link-blue'
                    {...getExternalLinkProps()}
                    href={'https://etherscan.io/address/' + account}
                  >{account}</a> <br />
                  {t('Wallet balance ETH')}: <Number4 value={ethBalance} />

                  <InputNumber
                    onChangeAmount={onChangeMasksAmount}
                  />
                  <p className='buy__summary'>
                    {t('Price')}: <Number0 value={maskPrice} /> ETH <br />
                    {t('Total')}: <Number0 value={totalEth} /> ETH
                  </p>
                  <Button className='btn-green' onClick={buyMasks} disabled={totalMasks === 0}>{t('Buy Masks')}</Button>
                </div>
              </Grid.Column>
            </Grid>
          ) : (
            <Grid columns='equal' stackable padded>
              <Grid.Column>
                <Image centered alt='' src='/images/buy/2.png' />
              </Grid.Column>
              <Grid.Column>
                <Button className='btn-blue' onClick={onPresentConnectModal}>
                  {t('Connect to MetaMask')}
                </Button>
                <p className='buy__text-7'>
                  <Trans t={t} i18nKey='pleaseInstallMetaMask'>
                    Please install <a
                      className='link-blue'
                      {...getExternalLinkProps()}
                      href='https://metamask.io/download.html'
                    >MetaMask</a>!
                  </Trans>
                  {isMobile && <><br />
                    <Trans t={t} i18nKey='orOpenItInMetaMaskMobile'>
                      Or open it in <a
                        className='link-blue'
                        {...getExternalLinkProps()}
                        href='https://metamask.app.link/dapp/thecosmomasks.com/#/buy'
                      >MetaMask Mobile</a>!
                    </Trans>
                  </>}
                </p>
              </Grid.Column>
            </Grid>
          )}
        </Container>
      </div>
    </Page>
  );
};

export default Buy;
