import React from 'react';
import dynamic from 'next/dynamic'
import { Link, useTranslation } from '../i18n';

const Layout = dynamic(() => import('../components/Layout'))

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout title="POC">
      <Link href="/pokemon">
        <a>🦊 {t('pokemon.title')}</a>
      </Link>
      <br/>
      <Link href="/pay">
        <a>💳 {t('pay.title')}</a>
      </Link>
      <br/>
      <Link href="/logger">
        <a>📈 Logger</a>
      </Link>
    </Layout>
  );
};
