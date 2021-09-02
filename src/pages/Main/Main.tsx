import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Image,
  Progress,
  Button,
} from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import Page from '../../components/Page';
import Number12 from '../../components/Number12';
import Number4 from '../../components/Number4';
import BuyAndSell from '../../components/BuyAndSell/BuyAndSell';
import { mobileBreakpoint, getAdaptiveClassName } from '../../helpers/Media';
import { IMainProps } from './MainTypes';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import getPowerBonus from '../../utils/getPowerBonus';
import getMaskSoldLeftPrice from '../../utils/getMaskSoldLeftPrice';
import { masksAddress, powerAddress } from '../../constants/index';
import './Main.scss';
import * as S from '../../store/selectors';
import { api } from '../../store/configureStore';
import BigNumber from 'bignumber.js';



const Main: React.FC<IMainProps> = () => {
  const { t } = useTranslation();
  const isMobile = useMediaPredicate(mobileBreakpoint);


  const [maskPrice, setMaskPrice] = useState(0);
  const [maskTotalSupply, setMaskTotalSupply] = useState(0);
  const [maskSoldAtPrice, setMaskSoldAtPrice] = useState(0);
  const [maskLeftAtPrice, setMaskLeftAtPrice] = useState(0);


  const getMasksTotalSupply = async () => {
    if (!api) return;
    try {
      const res = await api.getMasksTotalSupply();
      setMaskTotalSupply(parseInt(res));
    } catch (error) { console.error(error); }
  }

  const [powerEthPrice, setPowerEthPrice] = useState('0');
  const [cosmoEthPrice, setCosmoEthPrice] = useState('0');
  const [powerBscPrice, setPowerBscPrice] = useState('0');
  const [cosmoBscPrice, setCosmoBscPrice] = useState('0');
  const [powerPrice, setPowerPrice] = useState('0');
  const [cosmoPrice, setCosmoPrice] = useState('0');

  const getEthPriceCosmo = async () => {
    if (!api) return;
    try {
      const res = await api.getPriceCosmoUsdt();
      setCosmoEthPrice(res);
    } catch (error) { console.error(error); }
  }
  const getEthPricePower = async () => {
    if (!api) return;
    try {
      const res = await api.getPricePower();
      setPowerEthPrice(res);
    } catch (error) { console.error(error); }
  }

  const getBscPriceCosmo = async () => {
    if (!api) return;
    try {
      const res = await api.getBscPriceCosmoUsdt();
      setCosmoBscPrice(res);
    } catch (error) { console.error(error); }
  }
  const getBscPricePower = async () => {
    if (!api) return;
    try {
      const res = await api.getBscPricePower();
      setPowerBscPrice(res);
    } catch (error) { console.error(error); }
  }

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

  useEffect(() => {
    let tempPrice = new BigNumber(0);
    let tempPriceItems = 0;
    /*if (parseFloat(cosmoEthPrice) > 0) {
      tempPrice = tempPrice.plus(cosmoEthPrice);
      tempPriceItems++;
    }*/
    if (parseFloat(cosmoBscPrice) > 0) {
      tempPrice = tempPrice.plus(cosmoBscPrice);
      tempPriceItems++;
    }

    if (tempPriceItems > 1)
      setCosmoPrice(tempPrice.dividedBy(tempPriceItems).toFixed(15));
    else
      setCosmoPrice(tempPrice.toFixed(15));
  }, [cosmoEthPrice, cosmoBscPrice]);

  const ethBlockNumber: number = useSelector((state) => S.ethereum.getBlockNumber(state));
  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    if (updating) return;
    setUpdating(true);
    try {
      getMasksTotalSupply();
      //getEthPriceCosmo();
      //getEthPricePower();
    } catch (error) { console.error(error); }
    setUpdating(false);
  }, [ethBlockNumber]);


  const bscBlockNumber: number = useSelector((state) => S.binance.getBlockNumber(state));
  const [updating2, setUpdating2] = useState(false);
  useEffect(() => {
    if (updating2) return;
    setUpdating2(true);
    try {
      getBscPriceCosmo();
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

  return (
    <Page title='CosmoMasks'>
      <div className={getAdaptiveClassName('main__header', isMobile)}>
        <Container>
          <Header as='h1' content='CosmoMasks' />
          <p>{t('Enjoy collecting!')}</p>
        </Container>
      </div>

      <div className={getAdaptiveClassName('main', isMobile)}>
        <div className='main__section-1'>
          <Container>
            <Grid columns='equal' stackable>
              <Grid.Column>
                <Grid columns='equal' stackable>
                  <Grid.Column>
                    <Image centered src='/images/main/16410.png' />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <div className='name'>{t('homeWeHaveCollectionPart1')}</div>
                    <strong>16410</strong>
                    <div className='desc'>{t('homeWeHaveCollectionPart2')}</div>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid columns='equal' stackable>
                  <Grid.Column>
                    <Image centered src='/images/main/50.png' />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <div className='name'>{t('homeCollectionCreatedByPart1')}</div>
                    <strong>50</strong>
                    <div className='desc'>{t('homeCollectionCreatedByPart2')}</div>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>

            <h2><Trans t={t} i18nKey='homeByOwningNft' /></h2>
            <p>
              <Trans t={t} i18nKey='homeByOwningNftThatAllows'>
                That allows you to choose a name for your NFT
                on the Ethereum Blockchain and earn COSMO on the <a
                  {...getExternalLinkProps()}
                  href='https://cosmoswap.space/'
                >CosmoSwap</a>.
              </Trans>
            </p>

            <Progress
              progress='percent'
              precision={4}
              value={maskSoldAtPrice}
              total={maskSoldAtPrice + maskLeftAtPrice}
            />
            <p className='soldOut'>
              {t('SoldLeftPrice', { count: maskSoldAtPrice, leftCount: maskLeftAtPrice, price: maskPrice })}
            </p>
            <Button className='btn-buy' as={Link} to='/buy'>
              {t('Buy Masks')}
            </Button>
          </Container>
        </div>

        {/*
        <div className='main__section-2'>
          <Container>
            <Grid padded textAlign='center' stackable>
              <Grid.Row columns='equal'>
                <Grid.Column textAlign='center'>
                  <div className='line-1'>COSMO</div>
                  <div className='line-2'><Number12 value={cosmoPrice} prefix='$' /></div>
                </Grid.Column>
                <Grid.Column>
                  <div className='line-1'>СМР</div>
                  <div className='line-2'><Number12 value={powerPrice} prefix='$' /></div>
                </Grid.Column>
                <Grid.Column>
                  <div className='line-1'>{t('CashBack')}</div>
                  <div className='line-2'><Number4
                    value={getPowerBonus() * parseFloat(powerPrice)}
                    prefix='$'
                  /></div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
        */}

        <div className='main__section-3'>
          <Container>
            <Header as='h2'>
              <Trans t={t} i18nKey='homeWeLaunchedYieldFarming' />
            </Header>
            <p>
              <Trans t={t} i18nKey='homeWeLaunchedYieldFarming2'>
                See <a
                  className='link-blue'
                  {...getExternalLinkProps()}
                  href='https://cosmoswap.space/'
                >CosmoSwap.space</a>!
              </Trans>
            </p>
          </Container>
        </div>

        <div className='main__section-4'>
          <Container>
            <Header as='h2' content={t('NEWS')} />
            <Grid columns='equal' stackable>
              <Grid.Column>
                <Grid columns='equal' stackable>
                  <Grid.Column>
                    <Image inline alt='' src='/images/main/icon_1.png' />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <div className='news-box'>
                      <Trans t={t} i18nKey='homeWeLaunchedYieldFarming3' /> <a
                        className='link-yellow'
                        href='https://cosmoswap.space/'
                      >CosmoSwap</a>!
                      <br /><br />
                      <Trans t={t} i18nKey='homeWeLaunchedYieldFarming4' />
                    </div>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid columns='equal' stackable>
                  <Grid.Column>
                    <Image inline alt='' src='/images/main/icon_2.png' />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <div className='news-box'>
                      <Trans t={t} i18nKey='homeWeLaunchedYieldFarming5'>
                        Each <a
                          className='link-yellow'
                          {...getExternalLinkProps()}
                          href='https://opensea.io/collection/cosmomasks-main-collection'
                        >CosmoMasks</a>{' '}
                        gives you the CMP that you can use for Yield Farming on the <a
                          className='link-yellow'
                          {...getExternalLinkProps()}
                          href='https://cosmoswap.space/'
                        >CosmoSwap</a>.
                      </Trans>
                    </div>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
            <p>
              {t('Lives on the Ethereum Blockchain and hosted on IPFS')}{' '}
              ( <a
                className='link-yellow'
                {...getExternalLinkProps()}
                href='/provenance.html'
              >{t('Records and Proof')}
              </a> ).
            </p>

            <Container textAlign='center'>
              <BuyAndSell />
            </Container>
          </Container>
        </div>

        <div className='main__section-5'>
          <Container>
            <Header as='h1' content={<Trans t={t} i18nKey='homeMasksHeader' />} />
            <p><Trans t={t} i18nKey='homeMasksDesc1' /></p>
            <p><Trans t={t} i18nKey='homeMasksDesc2' /></p>
            <p><Trans t={t} i18nKey='homeMasksDesc3' /></p>
          </Container>
        </div>

        <div className='main__section-6'>
          <Container>
            <Grid columns={3} textAlign='center' stackable>
              <Grid.Column>
                <Image centered alt='' src='/images/main/1.png' />
                <div><Trans t={t} i18nKey='homeMask1Desc' /></div>
              </Grid.Column>
              <Grid.Column>
                <Image centered alt='' src='/images/main/2.png' />
                <div><Trans t={t} i18nKey='homeMask2Desc' /></div>
              </Grid.Column>
              <Grid.Column>
                <Image centered alt='' src='/images/main/3.png' />
                <div><Trans t={t} i18nKey='homeMask3Desc' /></div>
              </Grid.Column>
              <Grid.Column>
                <Image centered alt='' src='/images/main/4.png' />
                <div><Trans t={t} i18nKey='homeMask4Desc' /></div>
              </Grid.Column>
              <Grid.Column>
                <Image centered alt='' src='/images/main/5.png' />
                <div><Trans t={t} i18nKey='homeMask5Desc' /></div>
              </Grid.Column>
              <Grid.Column>
                <Image centered alt='' src='/images/main/6.png' />
                <div><Trans t={t} i18nKey='homeMask6Desc' /></div>
              </Grid.Column>
            </Grid>
          </Container>
        </div>

        <div className='main__section-7'>
          <Container>
            <Header as='h2'>
              <Trans t={t} i18nKey='homeFinal10NftHeader' />
            </Header>
            {isMobile && (
              <Image centered alt='' src='/images/main/collage.gif' />
            )}
          </Container>
        </div>

        <div className='main__section-8'>
          <Container>
            <p><Trans t={t} i18nKey='homeFinal10NftDescPart1' /></p>
            <p><Trans t={t} i18nKey='homeFinal10NftDescPart2' /></p>
          </Container>
        </div>

        <div className='main__section-9'>
          <Container>
            <Header as='h2'>
              <Trans t={t} i18nKey='homeHowDoesItWork' />
            </Header>
            <p><Trans t={t} i18nKey='homeHowDoesItWorkDescPart1' /></p>
            <p><Trans t={t} i18nKey='homeHowDoesItWorkDescPart2' /></p>
            <p><Trans t={t} i18nKey='homeHowDoesItWorkDescPart3' /></p>
            <p><Trans t={t} i18nKey='homeHowDoesItWorkDescPart4' /></p>
            <p><Trans t={t} i18nKey='homeHowDoesItWorkDescPart5' /></p>
          </Container>
          <Image alt='' src='/images/main/graphik.png' />
        </div>

        <div className='main__section-10'>
          <Container>
            <Grid columns='equal' stackable>
              <Grid.Column>
                <Image centered alt='' src='/images/main/art.jpg' />
              </Grid.Column>
              <Grid.Column>
                <Header as='h2'>
                  <Trans t={t} i18nKey='homeAnImmortalWorkOfArt' />
                </Header>
                <p><Trans t={t} i18nKey='homeAnImmortalWorkOfArtDescPart1' /></p>
              </Grid.Column>
            </Grid>
          </Container>
        </div>

        <div className='main__section-11'></div>

        <div className='main__section-12'>
          <Container>
            <Header as='h2'>
              <Trans t={t} i18nKey='homeMaskPowerIntroduction' />
            </Header>
            <p><Trans t={t} i18nKey='homeMaskPowerIntroductionDescPart1' /></p>
            <p><Trans t={t} i18nKey='homeMaskPowerIntroductionDescPart2' /></p>
            <Grid doubling stackable>
              <Grid.Column width={9}>
                <Header as='h2'>
                  <Trans t={t} i18nKey='homeVerifiedSmartContracts' />
                </Header>
                <p>
                  CosmoMasks:<br />
                  <a
                    className='link-yellow'
                    {...getExternalLinkProps()}
                    href={'https://etherscan.io/token/' + masksAddress}
                  >{masksAddress}</a>
                </p>
                <p>
                  CosmoMasks Power:<br />
                  <a
                    className='link-yellow'
                    {...getExternalLinkProps()}
                    href={'https://etherscan.io/token/' + powerAddress}
                  >{powerAddress}</a>
                </p>
                {/* TODO Registry Datastore */}
              </Grid.Column>
              {!isMobile && (
                <Grid.Column width={6} className='cube'>
                  <Image alt='' src='/images/main/cubes.png' />
                </Grid.Column>
              )}
            </Grid>
          </Container>
        </div>
      </div>
    </Page >
  );
};

export default Main;
