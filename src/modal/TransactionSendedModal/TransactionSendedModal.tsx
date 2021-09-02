import React from 'react';
import { useTranslation } from 'react-i18next';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import { Modal } from '../ModalProvider';



interface Props {
  data?: any;
  onDismiss?: () => void;
}


const TransactionSendedModal: React.FC<Props> = ({ data, onDismiss = () => null }) => {
  const { t } = useTranslation();
  return (
    <Modal title={t('Transaction sended')} onDismiss={onDismiss}>
      <p>tx:  <a
        className='link-blue'
        {...getExternalLinkProps()}
        href={'https://etherscan.io/tx/' + data.hash}
      >{data.hash}</a>
      </p>
    </Modal>
  )
};

export default TransactionSendedModal;
