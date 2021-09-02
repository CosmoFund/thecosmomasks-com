import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Grid, Header, Button } from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import BuyAndSell from '../../components/BuyAndSell/BuyAndSell';
import Page from '../../components/Page';
import { mobileBreakpoint, getAdaptiveClassName } from '../../helpers/Media';
import MaskImagePreview from '../../components/MaskImagePreview';
import Number4 from '../../components/Number4';

import { useEagerConnect, useActiveWeb3React } from '../../hooks/index';
//import useAuth from '../../hooks/useAuth';
//import { useWalletModal } from '../../modal/WalletModal';
import { useErrorModal } from '../../modal/ErrorModal';
import { useChangeMaskNameModal } from '../../modal/ChangeMaskNameModal';
import { useTransactionSendedModal } from '../../modal/TransactionSendedModal';
import { useTransactionConfirmedModal } from '../../modal/TransactionConfirmedModal';

import * as S from '../../store/selectors';
import { api } from '../../store/configureStore';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import getPowerBonus from '../../utils/getPowerBonus';
import './Details.scss';



interface PageQueryParams {
  id?: string;
}

interface PageQuery extends RouteComponentProps<PageQueryParams> {
  getMaskDataById: (id?: string) => any;
}

const Details: React.FC<PageQuery> = (props) => {
  const maskId = props.match.params.id || null;
  let mask: any = useSelector((state) => S.masksData.getMaskDataById(state, maskId));


  const { t } = useTranslation();
  const isMobile = useMediaPredicate(mobileBreakpoint);


  const [maskOwner, setMaskOwner] = useState(null);
  const [maskName, setMaskName] = useState(null);
  const [powerAccumulated, setPowerAccumulated] = useState<any>('0');
  const [powerLastClaim, setPowerLastClaim] = useState<any>('0');

  const getMaskOwnerByIndex = async () => {
    if (!api) return;
    try {
      const res = await api.getMaskOwnerByIndex(maskId);
      setMaskOwner(res);
    } catch (error) { console.error(error); }
  }

  const getMaskNameByIndex = async () => {
    if (!api) return;
    try {
      const res = await api.getMaskNameByIndex(maskId);
      setMaskName(res);
    } catch (error) { console.error(error); }
  }

  const getPowerAccumulated = async () => {
    if (!api) return;
    try {
      const res = await api.getPowerAccumulated(maskId);
      setPowerAccumulated(res.toString());
    } catch (error) { // маска не куплена
      //console.error(error);
      setPowerAccumulated(getPowerBonus());
    }
  }

  const getPowerLastClaim = async () => {
    if (!api) return;
    try {
      const res = await api.getPowerLastClaim(maskId);
      console.log(res)
      setPowerLastClaim(res);
    } catch (error) { // маска не куплена
      //console.error(error);
      setPowerLastClaim('0');
    }
  }


  const ethBlockNumber: number = useSelector((state) => S.ethereum.getBlockNumber(state));
  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    if (updating) return;
    setUpdating(true);
    try {
      getMaskOwnerByIndex();
      getMaskNameByIndex();
      getPowerLastClaim();
    } catch (error) { console.error(error); }
    setUpdating(false);
  }, [ethBlockNumber]);


  const triedEager = useEagerConnect();
  const context3 = useActiveWeb3React();
  const { library, chainId, account, active, error } = context3;

  //const { login, logout } = useAuth();
  //const { onPresentConnectModal } = useWalletModal(login, logout);
  const { onPresentErrorModal } = useErrorModal();
  const { onPresentTransactionSendedModal } = useTransactionSendedModal();
  const { onPresentTransactionConfirmedModal } = useTransactionConfirmedModal();


  const [isMaskOwner, setIsMaskOwner] = useState(false);

  useEffect(() => {
    if (maskOwner && maskOwner === account)
      setIsMaskOwner(true);
    else
      setIsMaskOwner(false);
  }, [maskOwner, account]);

  const claimAccumulatedPower = async () => {
    if (chainId !== 1)
      return onPresentErrorModal({
        message: 'Wrong Network! Switch the Network in the your Wallet!'
      });

    if (!api) return;

    try {
      const signer = library?.getSigner();
      try {
        const TransactionResponse = await api.claimAccumulatedPowerWithSigner([maskId], signer);
        onPresentTransactionSendedModal(TransactionResponse);
        const TransactionReceipt = await TransactionResponse.wait();
        onPresentTransactionConfirmedModal({ hash: TransactionReceipt.transactionHash });
      } catch (error) { onPresentErrorModal(error); }
    } catch (error) { console.error(error); }
  }


  const { onPresentChangeMaskNameModal, onDismissChangeMaskNameModal } = useChangeMaskNameModal();

  const handleClose = () => {
    onDismissChangeMaskNameModal();
  }

  const handleRename = async (newMaskName: string) => {
    onDismissChangeMaskNameModal();
    if (chainId !== 1)
      return onPresentErrorModal({
        message: 'Wrong Network! Switch the Network in the your Wallet!'
      });

    if (!api) return;
    try {
      const signer = library?.getSigner();
      const TransactionResponse = await api.changeMaskNameWithSigner(maskId, newMaskName, signer);
      onPresentTransactionSendedModal(TransactionResponse);
      const TransactionReceipt = await TransactionResponse.wait();
      onPresentTransactionConfirmedModal({ hash: TransactionReceipt.transactionHash });
    } catch (error) { onPresentErrorModal(error); }
  }


  const isMaskNameValid = async (newMaskName: string) => {
    if (!api) return;
    try {
      return await api.isMaskNameValid(newMaskName);
    } catch (error) { console.error(error); }
    return false;
  }

  const isMaskNameReserved = async (newMaskName: string) => {
    if (!api) return;
    try {
      return await api.isMaskNameReserved(newMaskName);
    } catch (error) { console.error(error); }
    return false;
  }

  const changeMaskNameOpenModal = async () => {
    try {
      onPresentChangeMaskNameModal({
        handleClose,
        isMaskNameValid,
        isMaskNameReserved,
        handleRename,
      });
    } catch (error) { onPresentErrorModal(error); }
  }

  const [time, setTime] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000)
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  if (!mask) {
    return (
      <Page title={t('Mask Not Found')}>
        <Container>
          <Header as='h1' content={t('Mask Not Found')} />
        </Container>
      </Page>
    );
  }

  return (
    <Page
      title={`${t('Details')} - ${mask.name ? mask.name : `CosmoMasks #${mask.index}`}` + ' - CosmoMasks'}
      className='container_details'
    >
      <div className={getAdaptiveClassName('details', isMobile)}>
        <Container>
          <Grid columns='equal' stackable>
            <Grid.Column>
              <div className='details__image-wrapper'>
                <Header as='h1' content={`CosmoMasks #${mask.index}`} />
                <MaskImagePreview ipfsPreview={mask.ipfsPreview} />
              </div>
            </Grid.Column>
            <Grid.Column>
              <p>
                <strong>{t('Mask Owner')}:</strong>{' '}
                {isMaskOwner
                  ? t('You Mask Owner') + ' - '
                  : t('Available to buy')
                } <a
                  className='link-blue'
                  {...getExternalLinkProps()}
                  href={'https://etherscan.io/address/' + maskOwner}
                >
                  {maskOwner}
                </a>
              </p>
              <p>
                <strong>Hash:</strong> {mask.hash}
              </p>
              <p>
                <strong>IPFS:</strong> <a
                  className='link-blue'
                  {...getExternalLinkProps()}
                  href={'https://ipfs.io/ipfs/' + mask.ipfs}
                >
                  {mask.ipfs}
                </a>
              </p>

              <div className='details__total'>
                {t('Accumulated Power')}: <Number4 value={getPowerBonus(powerLastClaim)} />
              </div>

              <Header as='h2' content={t('Traits')} />
              <div className='details__wrap'>
                <table className='details__table'>
                  <tbody>
                    <tr>
                      <td>{t('Name')}</td>
                      <td>
                        {maskName
                          ? <Link
                            {...getExternalLinkProps()}
                            to={`/gallery?character=${maskName}`}
                          >{maskName}</Link>
                          : '-'
                        }
                      </td>
                    </tr>

                    <tr>
                      <td>{t('Character')}</td>
                      <td>
                        {mask.Character
                          ? <Link
                            {...getExternalLinkProps()}
                            to={`/gallery?character=${mask.Character}`}
                          >{t(mask.Character)}</Link>
                          : '-'
                        }
                      </td>
                    </tr>

                    <tr>
                      <td>{t('Mask')}</td>
                      <td>
                        {mask.Mask
                          ? <Link
                            {...getExternalLinkProps()}
                            to={`/gallery?mask=${mask.Mask}`}
                          >{t(mask.Mask)}</Link>
                          : '-'
                        }
                      </td>
                    </tr>

                    <tr>
                      <td>{t('Item')}</td>
                      <td>
                        {mask.Item
                          ? <Link
                            {...getExternalLinkProps()}
                            to={`/gallery?item=${mask.Item}`}
                          >{t(mask.Item)}</Link>
                          : '-'
                        }
                      </td>
                    </tr>

                    <tr>
                      <td>{t('Background')}</td>
                      <td>
                        {mask.Background
                          ? <Link
                            {...getExternalLinkProps()}
                            to={`/gallery?background=${mask.Background}`}
                          >{t(mask.Background)}</Link>
                          : '-'
                        }
                      </td>
                    </tr>

                    <tr>
                      <td>{t('Label')}</td>
                      <td>
                        {mask.Label
                          ? <Link
                            {...getExternalLinkProps()}
                            to={`/gallery?label=${mask.Label}`}
                          >{t(mask.Label)}</Link>
                          : '-'
                        }
                      </td>
                    </tr>

                    <tr>
                      <td>{t('Exclusive')}</td>
                      <td>
                        {mask.Exclusive
                          ? <Link
                            {...getExternalLinkProps()}
                            to={`/gallery?exclusive=${mask.Exclusive}`}
                          >{t(mask.Exclusive)}</Link>
                          : '-'
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
                <BuyAndSell />
              </div>
            </Grid.Column>
          </Grid>

          <Grid columns='equal' stackable>
            <Grid.Column>
              {isMaskOwner
                ? <div>
                  <Button fluid className='btn-green link' onClick={claimAccumulatedPower}>
                    {t('Claim accumulated Power')}
                  </Button>
                </div>
                : null
              }
            </Grid.Column>
            <Grid.Column>
              {isMaskOwner
                ? <div>
                  <Button fluid className='btn-green link' onClick={changeMaskNameOpenModal}>
                    {t('Change Mask Name')}
                  </Button>
                </div>
                : null
              }
            </Grid.Column>
          </Grid>

          {mask['Character Name']
            ? <div>
              <Header as='h2' content={<strong>{mask['Character Name']}</strong>} />
              <p>{mask['Character Story']}</p>
            </div>
            : null
          }

          {/* Naming History */}
        </Container>
      </div>
    </Page>
  );
};

export default Details;
