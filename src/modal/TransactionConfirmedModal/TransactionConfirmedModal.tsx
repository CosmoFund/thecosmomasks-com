import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../ModalProvider';
import getExternalLinkProps from '../../utils/getExternalLinkProps';



interface Props {
  data?: any;
  onDismiss?: () => void;
}


const TransactionConfirmedModal: React.FC<Props> = ({ data, onDismiss = () => null }) => {
  const { t } = useTranslation();
  return (
    <Modal title={t('Transaction confirmed')} onDismiss={onDismiss}>
      <p>tx: <a
        className='link-blue'
        {...getExternalLinkProps()}
        href={'https://etherscan.io/tx/' + data.hash}
      >{data.hash}</a>
      </p>
    </Modal>
  )
};

export default TransactionConfirmedModal;
