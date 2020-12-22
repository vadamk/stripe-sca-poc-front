import React from 'react';
import dynamic from 'next/dynamic'
import Link from 'next/link'

const Layout = dynamic(() => import('../components/Layout'))

export default function Home() {
  return (
    <Layout title="POC">
      <Link href="/pokemon">
        <a>🦊 Pokemons</a>
      </Link>
      <br/>
      <Link href="/pay">
        <a>💳 Pay</a>
      </Link>
      <br/>
      <Link href="/logger">
        <a>📈 Logger</a>
      </Link>
    </Layout>
  );
};
