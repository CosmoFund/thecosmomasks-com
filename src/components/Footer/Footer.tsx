import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Container, Image, List } from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { mobileBreakpoint } from '../../helpers/Media';
import { Routes } from '../../router/helper';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import './Footer.scss';



const BlockIcons: React.FC = () => (
  <>
    <a
      {...getExternalLinkProps()}
      href='https://t.me/CosmoFundChannel'
    >
      <Image inline src='/images/layout/icons-01.png' />
    </a>
    <a
      {...getExternalLinkProps()}
      href='https://medium.com/@CosmoFund'
    >
      <Image inline src='/images/layout/icons-02.png' />
    </a>
    <a
      {...getExternalLinkProps()}
      href='https://twitter.com/CosmoFund'
    >
      <Image inline src='/images/layout/icons-03.png' />
    </a>
  </>
);


const FooterLinks: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useMediaPredicate(mobileBreakpoint);

  return (
    <>
      <div className='footer__links'
        style={{ maxWidth: '1366px', margin: '0 auto' }}
      >
        <Container>
          <p>
            <a
              {...getExternalLinkProps()}
              href={'https://cosmoswap.space/'}
            >
              {t('CosmoSwap - Join for profit')}
            </a>
          </p>
          <List link horizontal={!isMobile}>
            <List.Item
              as={'a'}
              {...getExternalLinkProps()}
              href={'https://cosmofund.space/'}
            >
              {t('copyright', { year: new Date().getFullYear() })}
            </List.Item>
          </List>

          <List link horizontal={!isMobile}>
            <List.Item
              as={Link}
              {...getExternalLinkProps()}
              to={Routes.terms}
            >
              {t('Terms and Conditions')}
            </List.Item>
            <List.Item
              as={Link}
              {...getExternalLinkProps()}
              to={Routes.privacy}
            >
              {t('Privacy Policy')}
            </List.Item>
            <List.Item
              as={Link}
              {...getExternalLinkProps()}
              to={Routes.grants}
            >
              {t('Grant Program')}
            </List.Item>
            <List.Item
              as={Link}
              {...getExternalLinkProps()}
              to={Routes.faq}
            >
              {t('FAQ')}
            </List.Item>
            <List.Item
              as={'a'}
              {...getExternalLinkProps()}
              href='mailto:support@CosmoFund.space'
            >
              {t('Contact Us')}
            </List.Item>
            <List.Item
              as={Link}
              {...getExternalLinkProps()}
              to={Routes.disclaimer}
            >
              {t('Disclaimer')}
            </List.Item>
          </List>
        </Container>
      </div>
    </>
  );
}



const Footer: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);

  return (
    <>
      {isMobile ? (
        <footer className='footer footer-mobile'>
          <BlockIcons />
          <div className='footer__bg'></div>
          <FooterLinks />
        </footer>
      ) : (
        <footer className='footer'>
          <div className=' footer__bg'>
            <div className='icons'>
              <BlockIcons />
            </div>
          </div>
          <FooterLinks />
        </footer>
      )}
    </>
  );
};

export default Footer;
