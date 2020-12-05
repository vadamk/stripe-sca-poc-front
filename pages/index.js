import React from 'react';
import dynamic from 'next/dynamic'
import { Link, useTranslation } from '../i18n';

const Layout = dynamic(() => import('../components/Layout'))

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout>
      <Link href="/articles">
        <a>{t('articles.title')}</a>
      </Link>
      <br/>
      <Link href="/pay">
        <a>Pay</a>
      </Link>
    </Layout>
  );
};
