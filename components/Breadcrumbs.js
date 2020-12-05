import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Breadcrumbs = () => {
  const router = useRouter();

  const isHomePage = router.pathname === '/'

  return (
    <>
      {!isHomePage && (
        <Link href="/">
          <a>🏠 Home</a>
        </Link>
      )}
    </>
  );
}

export default Breadcrumbs;
