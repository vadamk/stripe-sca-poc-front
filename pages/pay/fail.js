import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('../../components/Layout'))

export default function PayFail() {
  const { query } = useRouter()

  return (
    <Layout>
      <h1 style={{ color: 'red', marginBottom: 0 }}>😥 Failed</h1>
      {query.error && (
        <p style={{ color: 'red' }}>{query.error}</p>
      )}
      <Link href="/pay">
        <a>🔙 Back to Pay</a>
      </Link>
    </Layout>
  )
}
