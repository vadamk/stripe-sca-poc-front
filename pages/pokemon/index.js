import React from 'react';
import dynamic from 'next/dynamic'
import Link from 'next/link'

const Layout = dynamic(() => import('../../components/Layout'))

export default function PokemonList({ data }) {
  return (
    <Layout title="Pokemons">
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
