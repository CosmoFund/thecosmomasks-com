import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Image } from 'semantic-ui-react';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import './BuyAndSell.scss';



const BuyAndSell: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='buyAndSell'>
      <a
        {...getExternalLinkProps()}
        href='https://opensea.io/collection/cosmomasks-main-collection'
      >
        <Image
          inline
          alt={'Buy and Sell CosmoMasks on OpenSea'}
          src='/images/main/OpenSea.png'
        />
        <div className='buyAndSell__btn'>
          <Trans t={t} i18nKey='Buy and Sell NFTs on OpenSea' />
        </div>
      </a>
    </div>
  );
};

export default BuyAndSell;
