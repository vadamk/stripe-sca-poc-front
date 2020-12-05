import React from 'react';
import dynamic from 'next/dynamic'
import { useTranslation, Link } from '../../i18n'

const Layout = dynamic(() => import('../../components/Layout'))

export default function Pokemon({ data }) {
  const { t } = useTranslation();

  const artwork = React.useMemo(() => {
    return data?.sprites.other['official-artwork'].front_default;
  }, [data]); 

  const icon = React.useMemo(() => {
    return data?.sprites.front_default;
  }, [data]);
  
  return (
    <Layout>
      <h1>{data?.name}</h1>
      {artwork && <img width={200} src={artwork} alt={`${data?.name} artwork`} />}
      <br/>
      <Link href="/pokemon">
        <a>🔙 {t('pokemon.title')}</a>
      </Link>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.API_URL}/pokemon/${params.slug}`);
  const data = await res.json()

  return {
    props: { data }, // will be passed to the page component as props
  }
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.API_URL}/pokemon`)
  const data = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = data.results.map(item => ({
    params: { slug: item.name },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
