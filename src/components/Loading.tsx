import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'semantic-ui-react';
import { getLoadingGif } from '../components/Base64ImageData';



const Loading: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='fullPage'>
      <Image
        centered
        size='big'
        alt={t('Loading')}
        src={getLoadingGif()}
      />
    </div>
  );
};

export default Loading;
