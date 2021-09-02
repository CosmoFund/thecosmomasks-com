import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Container, Image } from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { getAdaptiveClassName, mobileBreakpoint } from '../../helpers/Media';
import Page from '../../components/Page';
import { Routes } from '../../router/helper';
import './NotFound.scss';




const PageNotFound = () => {
  const { t } = useTranslation();
  const isMobile = useMediaPredicate(mobileBreakpoint);

  return (
    <Page title={t('Page not found') + ' - CosmoMasks'} isEmpty className='cover'>
      <div className={getAdaptiveClassName('notFound', isMobile)}>
        <Container>
          <p>
            <Trans t={t} i18nKey='thisPlanetNoLongerExists'>
              This planet no longer exists.
              <br />But you have a chance to return to the world where there is life :)
            </Trans>
          </p>
          {!isMobile && (
            <>
              <Image centered alt='' src='/images/layout/nlo.png' />
              <Link to={Routes.main}>{t('Go to Home page')}</Link>
            </>
          )}
          <div className='error'>
            4<Image alt='' src='/images/layout/error.png' />4
          </div>
          {isMobile && (
            <>
              <Image centered alt='' src='/images/layout/nlo.png' />
              <Link to={Routes.main}>{t('Go to Home page')}</Link>
            </>
          )}
        </Container>
      </div>
    </Page>
  );
};

export default PageNotFound;
