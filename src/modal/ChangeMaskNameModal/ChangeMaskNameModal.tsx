import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, } from 'semantic-ui-react';
import { Modal } from '../ModalProvider';



interface Props {
  data?: any;
  onDismiss?: () => void;
}


const ChangeMaskNameModal: React.FC<Props> = ({ data, onDismiss = () => null }) => {
  const { t } = useTranslation();
  const [maskName, setMaskName] = useState('');
  const [isInvalidName, setInvalidName] = useState(false);
  const [isReservedName, setReservedName] = useState(false);

  const handleChange = (e: any, se: any) => {
    setMaskName(se.value);

    data.isMaskNameValid(se.value).then((res: boolean) => {
      if (res) setInvalidName(false);
      else setInvalidName(true);
    });
    data.isMaskNameReserved(se.value).then((res: boolean) => {
      if (res) setReservedName(true);
      else setReservedName(false);
    });
  }

  return (
    <Modal
      title={t('Rename your Mask')}
      onDismiss={onDismiss}
      actions={
        <>
          <Button
            onClick={() => data.handleClose()}
            negative
          >{t('Close')}</Button>
          <Button
            onClick={() => data.handleRename(maskName)}
            positive
            disabled={maskName === '' || isInvalidName || isReservedName}
          >{t('Rename')}</Button>
        </>
      }
    >
      <Form inverted>
        <Form.Field>
          <Form.Input
            label={t('Type a valid Mask Name')}
            placeholder='NewMyMaskName'
            name='newMaskName'
            value={maskName}
            onChange={handleChange}
            pattern='^[A-Za-z0-9]{1}[A-Za-z0-9 ]{0,23}[A-Za-z0-9]{0,1}$'
            error={isInvalidName || isReservedName ? {
              content: isInvalidName ? t('Type a valid Mask Name') : t('This name is already taken'),
              pointing: 'below',
            } : false}
          />
        </Form.Field>
      </Form>
    </Modal>
  )
};

export default ChangeMaskNameModal;
