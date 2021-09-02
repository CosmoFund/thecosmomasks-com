import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Container, Image } from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { getAdaptiveClassName, mobileBreakpoint } from '../../helpers/Media';
import Page from '../../components/Page';
import { Routes } from '../../router/helper';
import './Unavailable.scss';



const Unavailable = () => {
  const { t } = useTranslation();
  const isMobile = useMediaPredicate(mobileBreakpoint);

  return (
    <Page title={t('Maintenance') + ' - CosmoMasks'} isEmpty className='cover'>
      <div className={getAdaptiveClassName('unavailable', isMobile)}>
        <Container>
          <p>
            <Trans t={t} i18nKey='onThisPlanetAreMaintenance'>
              On this planet are maintenance,
              <br />it is not yet suitable for life.
            </Trans>
          </p>
          <Image centered alt='' src='/images/layout/nlo.png' />
          <Link to={Routes.main}>{t('Go to Home page')}</Link>
        </Container>
      </div>
    </Page>
  );
};

export default Unavailable;
