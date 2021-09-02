import React from 'react';
import { useModal } from '../ModalProvider';
import TransactionSendedModal from './TransactionSendedModal';



interface ReturnType {
  onPresentTransactionSendedModal: (data?: any) => void;
}

const useTransactionSendedModal = (): ReturnType => {
  const [onPresentTransactionSendedModal] = useModal(<TransactionSendedModal />);
  return { onPresentTransactionSendedModal };
};

export default useTransactionSendedModal;
