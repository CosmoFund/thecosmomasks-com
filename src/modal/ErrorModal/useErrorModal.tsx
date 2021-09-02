import React from 'react';
import { useModal } from '../ModalProvider';
import ErrorModal from './ErrorModal';



interface ReturnType {
  onPresentErrorModal: (data?: any) => void;
}

const useErrorModal = (): ReturnType => {
  const [onPresentErrorModal] = useModal(<ErrorModal />);
  return { onPresentErrorModal };
};

export default useErrorModal;
