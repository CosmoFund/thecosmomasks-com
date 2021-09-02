import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../ModalProvider';
import { isProduction } from '../../constants/index';



interface Props {
  data?: any;
  onDismiss?: () => void;
}


const ErrorModal: React.FC<Props> = ({ data, onDismiss = () => null }) => {
  const { t } = useTranslation();
  return (
    <Modal title={t('Error')} onDismiss={onDismiss}>
      <p>{data.code}</p>
      <p>{data.message}</p>
      {isProduction
        ? null
        : <p>{data.stack}</p>
      }
    </Modal>
  )
};

export default ErrorModal;
