import React from 'react';
import { useModal } from '../ModalProvider';
import TransactionSendedModal from './ChangeMaskNameModal';



interface ReturnType {
  onPresentChangeMaskNameModal: (data?: any) => void;
  onDismissChangeMaskNameModal: () => void;
}

const useChangeMaskNameModal = (): ReturnType => {
  const [onPresentChangeMaskNameModal, onDismissChangeMaskNameModal] = useModal(<TransactionSendedModal />);
  return { onPresentChangeMaskNameModal, onDismissChangeMaskNameModal };
};

export default useChangeMaskNameModal;
