import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { Container, Header, Button, Image } from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { Link } from 'react-router-dom';
import Page from '../../components/Page';
import Number0 from '../../components/Number0';
import Number4 from '../../components/Number4';
import MaskList from '../../components/MaskList';
import { mobileBreakpoint, getAdaptiveClassName } from '../../helpers/Media';
import { IWalletProps } from './WalletTypes';
import { useEagerConnect, useActiveWeb3React } from '../../hooks/index';
import useAuth from '../../hooks/useAuth';
import { useWalletModal } from '../../modal/WalletModal';
import { useErrorModal } from '../../modal/ErrorModal';
import { useTransactionSendedModal } from '../../modal/TransactionSendedModal';
import { useTransactionConfirmedModal } from '../../modal/TransactionConfirmedModal';

import { api } from '../../store/configureStore';
import * as S from '../../store/selectors';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import './Wallet.scss';



const showedStep = 25;

const Wallet: React.FC<IWalletProps> = () => {
  const { t } = useTranslation();
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const [hasMask, setHasMask] = useState(0);
  const [maskList, setMaskList] = useState([]);
  const [powerAccumulated, setPowerAccumulated] = useState(0);
  const [powerBalance, setPowerBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);

  const triedEager = useEagerConnect();
  const context3 = useActiveWeb3React();
  const { library, chainId, account, active, error } = context3;

  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);
  const { onPresentErrorModal } = useErrorModal();
  const { onPresentTransactionSendedModal } = useTransactionSendedModal();
  const { onPresentTransactionConfirmedModal } = useTransactionConfirmedModal();


  const [showed, setShowed] = useState(0);
  const showMore = () => {
    setShowed(showed + showedStep);
  }


  const getMasksBalanceOf = async () => {
    if (!api) return;
    try {
      const res = await api.getMasksBalanceOf(account);
      setHasMask(res);
    } catch (error) { console.error(error); }
  }

  const getMasksListByOwner = async () => {
    if (!api) return;
    try {
      const res = await api.getMasksListByOwner(account);
      setMaskList(res);
    } catch (error) { console.error(error); }
  }

  const getPowerAccumulatedByMaskList = async () => {
    if (!api) return;
    try {
      const res = await api.getPowerAccumulatedByMaskList(maskList);
      setPowerAccumulated(res);
    } catch (error) { console.error(error); }
  }

  const getPowerBalanceOf = async () => {
    if (!api) return;
    try {
      const res = await api.getPowerBalanceOf(account);
      setPowerBalance(res);
    } catch (error) { console.error(error); }
  }

  const getEthBalance = async () => {
    if (!api) return;
    try {
      const res = await api.getEthBalance(account);
      setEthBalance(res);
    } catch (error) { console.error(error); }
  }

  const claimAccumulatedPower = async () => {
    if (chainId !== 1)
      return onPresentErrorModal({
        message: 'Wrong Network! Switch the Network in the your Wallet!'
      });

    if (!api) return;

    try {
      if (maskList.length === 0)
        return onPresentErrorModal({ message: 'You have no CosmoMasks!' });

      const signer = library?.getSigner();
      try {
        const TransactionResponse = await api.claimAccumulatedPowerWithSigner(maskList, signer);
        onPresentTransactionSendedModal(TransactionResponse);
        const TransactionReceipt = await TransactionResponse.wait();
        onPresentTransactionConfirmedModal({ hash: TransactionReceipt.transactionHash });
      } catch (error) { onPresentErrorModal(error); }
    } catch (error) { console.error(error); }
  }


  const ethBlockNumber: number = useSelector((state) => S.ethereum.getBlockNumber(state));

  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    if (updating) return;
    setUpdating(true);
    if (triedEager && active && account) {
      getMasksBalanceOf();
      getMasksListByOwner();
      getPowerBalanceOf();
      getEthBalance();
    } else { // сброс
      setHasMask(0);
      setMaskList([]);
      setPowerBalance(0);
      setEthBalance(0);
    }
    setUpdating(false);
  }, [triedEager, active, account, ethBlockNumber]);

  const [updating2, setUpdating2] = useState(false);
  useEffect(() => {
    if (updating2) return;
    setUpdating2(true);
    if (maskList.length > 0) {
      getPowerAccumulatedByMaskList();
    } else { // сброс
      setPowerAccumulated(0);
    }
    setUpdating2(false);
  }, [maskList, ethBlockNumber]);


  const [time, setTime] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000)
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <Page title={t('Your wallet') + ' - CosmoMasks'} className='container_wallet'>
      <div className={getAdaptiveClassName('wallet__header', isMobile)}>
        <Container>
          <Header as='h1' content={t('Your wallet')} />
        </Container>
      </div>

      <div className={getAdaptiveClassName('wallet', isMobile)}>
        <Container>
          <p>{active && account ? <a
            className='link-blue'
            {...getExternalLinkProps()}
            href={'https://etherscan.io/address/' + account}
          >{account}</a>
            : null
          }</p>

          <p>
            {t('Accumulated Power')}: <Number4 value={powerAccumulated} /><br />
            {t('Wallet balance Power')}: <Number4 value={powerBalance} /><br />
            {t('Wallet balance ETH')}: <Number4 value={ethBalance} />
          </p>

          {triedEager && active && account
            ? <div>
              <Button className='btn-green link' onClick={claimAccumulatedPower}>
                {t('Claim accumulated Power')}
              </Button>
            </div>
            : <div>
              <Button className='btn-green link' onClick={() => onPresentConnectModal()}>
                {/*t('Connect to MetaMask')*/}
                {t('Claim accumulated Power')}
              </Button>
              <p className='buy__text-7'>
                <Trans t={t} i18nKey='pleaseInstallMetaMask'>
                  Please install <a
                    className='link-blue'
                    {...getExternalLinkProps()}
                    href='https://metamask.io/download.html'
                  >MetaMask</a>!
                </Trans><br />
                <Trans t={t} i18nKey='orOpenItInMetaMaskMobile'>
                  Or open it in <a
                    className='link-blue'
                    {...getExternalLinkProps()}
                    href='https://metamask.app.link/dapp/thecosmomasks.com/#/wallet'
                  >MetaMask Mobile</a>!
                </Trans>
              </p>
            </div>
          }

          <Header as='h2' content={<div>
            {t('Owned Masks')}: <Number0 value={hasMask} /> {t('pcs')}
          </div>} />
          {hasMask > 0 ? (
            <MaskList
              masks={maskList}
              showed={0} showedStep={showedStep}
              showMore={showMore}
            />
          ) : (
            <>
              <Button className='btn-green-2' as={Link} to={'/buy'}>
                {t('You do not own any Masks')}
              </Button>
              {!isMobile && <Image src='/images/wallet/rocket.png' />}
            </>
          )}
          {isMobile && <Image centered src='/images/wallet/rocket.png' />}
        </Container>
      </div>
    </Page>
  );
};

export default Wallet;
