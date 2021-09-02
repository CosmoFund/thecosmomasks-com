import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';
import ScrollToTop from './ScrollToTop';



interface IPageProps {
  title: string;
  description?: string;
  isEmpty?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Page: React.FC<IPageProps> = ({ title, children, isEmpty, className }) => {
  const { i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <meta charSet='utf-8' />
        <title>{title}</title>
      </Helmet>
      {!isEmpty && <Header />}
      <main style={{ minHeight: '95vh', }} className={className}>
        {children}
      </main>
      {!isEmpty && <Footer />}
      <ScrollToTop />
    </>
  );
};

export default Page;
