import React, { useState } from 'react';
import { Header, Modal as ModalUi } from 'semantic-ui-react';
import { ModalProps } from './types';



const Modal: React.FC<ModalProps> = ({
  title,
  actions,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = '24px',
  //headerBackground = 'transparent',
  //minWidth = '320px',
  open = true,
  ...props
}) => {
  //const [isOpen, setOpen] = useState<boolean>(true);
  const isOpen = true;

  return (
    <ModalUi
      closeIcon={!hideCloseButton}
      //minWidth={minWidth}
      {...props}
      open={open}
      onClose={onDismiss}
    >
      <ModalUi.Header style={{ backgroundColor: '#0a1936', }}>
        <Header>{title}</Header>
      </ModalUi.Header>
      <ModalUi.Content style={{ backgroundColor: '#0a1936', }}>{children}</ModalUi.Content>
      <ModalUi.Actions style={{ backgroundColor: '#0a1936', }}>{actions}</ModalUi.Actions>
    </ModalUi>
  )
};

export default Modal;
