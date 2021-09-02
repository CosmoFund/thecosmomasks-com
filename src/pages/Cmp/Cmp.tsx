import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Grid, Header, Image } from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import Page from '../../components/Page';
import Number4 from '../../components/Number4';
import { mobileBreakpoint, getAdaptiveClassName } from '../../helpers/Media';
import { ICmpProps } from './CmpTypes';
import * as S from '../../store/selectors';
import { api } from '../../store/configureStore';
import BigNumber from 'bignumber.js';
import './Cmp.scss';



const Cmp: React.FC<ICmpProps> = () => {
  const { t } = useTranslation();
  const isMobile = useMediaPredicate(mobileBreakpoint);

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
    <Page title='CosmoMasks Power (CMP) - CosmoMasks'>
      <div className={getAdaptiveClassName('cmp__header', isMobile)}>
        <Container>
          <Header as='h1' content='CosmoMasks Power (CMP)' />
          <div>
            <p>{t('PowerToken Price')}: <Number4 prefix='$' value={powerPrice} /></p>
          </div>
        </Container>
      </div>

      <Container className={getAdaptiveClassName('cmp', isMobile)}>
        <Header as='h2' content={t('What is it?')} />
        <p>{t('What is it #1')}</p>
        <p>{t('What is it #2')}</p>

        <Grid columns='equal' stackable doubling className='cmp__rules'>
          <Grid.Column only='tablet computer'>
            <Image alt='' centered src='/images/cmp/man.png' />
          </Grid.Column>
          <Grid.Column mobile='16' tablet='8' computer='8'>
            <Header as='h2' className='cmp__rules-header' content={t('The Rules')} />
            <div className='cmp__rules-list'>
              <ul>
                <li>{t('The Rules #1')}</li>
                <li>{t('The Rules #2')}</li>
                <li>{t('The Rules #3')}</li>
                <li>{t('The Rules #4')}</li>
                <li>{t('The Rules #5')}</li>
                <li>{t('The Rules #6')}</li>
              </ul>
            </div>
          </Grid.Column>
        </Grid>

        <Header as='h2' content={t('Emission Rate of PowerToken')} />
        <p>{t('Emission Rate of PowerToken Desc')}
        </p>

        <Grid textAlign='center' stackable>
          <Grid.Row columns='equal'>
            <Grid.Column textAlign='center'>
              <Image inline src='/images/cmp/mask-1.png' />
              <div className='cmp__total-count'>3660</div>
              <p>{t('PowerToken emitted')}</p>
            </Grid.Column>
            <Grid.Column>
              <Image inline src='/images/cmp/mask-2.png' />
              <div className='cmp__total-count'>1830</div>
              <p>{t('PowerToken required')}</p>
            </Grid.Column>
            <Grid.Column>
              <Image inline src='/images/cmp/mask-3.png' />
              <div className='cmp__total-count'>1830</div>
              <p>{t('PowerToken Bonus')}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Page>
  );
};

export default Cmp;
