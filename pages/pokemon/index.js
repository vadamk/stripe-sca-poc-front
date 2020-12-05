import React from 'react';
import dynamic from 'next/dynamic'
import { useTranslation, Link } from '../../i18n'

const Layout = dynamic(() => import('../../components/Layout'))

export default function PokemonList({ data }) {
  const { t } = useTranslation();

  return (
    <Layout title={t('pokemon.title')}>
      {data.results.map(item => (
        <div key={item.name}>
          <Link href="/pokemon/[slug]" as={`/pokemon/${item.name}`}>
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
