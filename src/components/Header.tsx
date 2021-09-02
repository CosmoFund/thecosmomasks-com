import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Menu,
  Image,
  Sidebar,
  Icon,
  Dropdown,
} from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import { mobileBreakpoint } from '../helpers/Media';
import { Routes } from '../router/helper';



const MenuItems: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Menu.Item header as={NavLink} to={Routes.gallery}>
        {t('Gallery').toUpperCase()}
      </Menu.Item>
      <Menu.Item header as={NavLink} to={Routes.cmp}>
        {t('CMP token').toUpperCase()}
      </Menu.Item>
      <Menu.Item header as={NavLink} to={Routes.buy}>
        {t('Buy').toUpperCase()}
      </Menu.Item>
      <Menu.Item header as={NavLink} to={Routes.wallet}>
        {t('Wallet').toUpperCase()}
      </Menu.Item>
    </>
  );
};

export const langOptions = [
  { key: 'en', value: 'en', text: 'EN' },
  { key: 'cn', value: 'cn', text: 'CN' },
  { key: 'ru', value: 'ru', text: 'RU' },
];

const Header: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaPredicate(mobileBreakpoint);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (e: any, se: any) => {
    i18n.changeLanguage(se.value);
  };


  return (
    <>
      <Menu
        fixed='top'
        size='large'
        pointing={true}
        secondary={false}
        className='main-menu'
      >
        <Container>
          <Menu.Item
            header
            as={Link}
            to={Routes.main}
            position='left'
            className={isMobile ? 'main-menu-mobile' : undefined}
          >
            <Image spaced='right' src='/images/layout/logo.png' />
            CosmoMasks
          </Menu.Item>
          {isMobile ? (
            <>
              <Dropdown
                name='lang'
                options={langOptions}
                value={i18n.language}
                onChange={changeLanguage}
              />
              <Menu.Item onClick={toggleMenu}>
                <Icon name='sidebar' />
              </Menu.Item>
            </>
          ) : (
            <>
              <MenuItems />
              <Dropdown
                name='lang'
                options={langOptions}
                value={i18n.language}
                onChange={changeLanguage}
              />
            </>
          )}
        </Container>
      </Menu>
      {isMobile && (
        <Sidebar
          as={Menu}
          animation='overlay'
          inverted
          onHide={() => setMenuOpen(false)}
          vertical
          visible={isMenuOpen}
        >
          <MenuItems />
        </Sidebar>
      )}
    </>
  );
};

export default Header;
