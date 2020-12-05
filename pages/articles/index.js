import React from 'react';
import dynamic from 'next/dynamic'
import { useTranslation, Link } from '../../i18n'

const Layout = dynamic(() => import('../../components/Layout'))

export default function Articles({ data }) {
  const { t } = useTranslation();

  return (
    <Layout>
      <h1>{t('articles.title')}</h1>
      {data.results.map(item => (
        <div key={item.name}>
          <Link href="/articles/[slug]" as={`/articles/${item.name}`}>
            <a>{item.name}</a>
          </Link>
          <br/>
        </div>
      ))}
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}/pokemon`);
  const data = await res.json()

  return {
    props: { data }, // will be passed to the page component as props
  }
};
