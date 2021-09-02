import React from 'react';
import { useModal } from '../ModalProvider';
import TransactionConfirmedModal from './TransactionConfirmedModal';



interface ReturnType {
  onPresentTransactionConfirmedModal: (data?: any) => void;
}

const useTransactionConfirmedModal = (): ReturnType => {
  const [onPresentTransactionConfirmedModal] = useModal(<TransactionConfirmedModal />);
  return { onPresentTransactionConfirmedModal };
};

export default useTransactionConfirmedModal;
