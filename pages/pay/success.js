import React from 'react';
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('../../components/Layout'))

export default function PaySuccess() {
  return (
    <Layout>
      <h1 style={{ color: 'green' }}>Success</h1>
      <Link href="/pay">
        <a>🔙 Back to Pay</a>
      </Link>
    </Layout>
  )
}
