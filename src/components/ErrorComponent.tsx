import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Header, } from 'semantic-ui-react';



export const ErrorComponent = () => {
  const { t } = useTranslation();

  return (
    <Container textAlign='center'>
      <Header as='h1' content={t('Something went wrong')} />
      <Header as='h2' content={t('We are working to resolve the problem')} />
    </Container>
  );
};
