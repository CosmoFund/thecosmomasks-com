import React from 'react';
import { useTranslation } from 'react-i18next';
//import { Link } from '../../components/Link';
import { List, } from 'semantic-ui-react';
//import { HelpIcon } from '../../components/Svg';
import { Modal } from '../ModalProvider';
import WalletCard from './WalletCard';
import config from './config';
import { Login } from './types';



interface Props {
  login: Login;
  onDismiss?: () => void;
}


const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null }) => {
  const { t } = useTranslation();
  return (
    <Modal title={t('Connect to a wallet')} onDismiss={onDismiss}>
      <List>
        {config.map((entry, index) => (
          <WalletCard
            key={entry.title}
            login={login}
            walletConfig={entry}
            onDismiss={onDismiss}
          //mb={index < config.length - 1 ? '8px' : '0'}
          />
        ))}
      </List>
    </Modal>
  )
};

export default ConnectModal;
