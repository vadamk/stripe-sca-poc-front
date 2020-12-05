import React from 'react'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('./Footer'))
const Breadcrumbs = dynamic(() => import('./Breadcrumbs'))

const Layout = ({ children }) => {

  return (
    <>
      <div className="root">
        <main>
          <Breadcrumbs />
          {children}
        </main>
        <Footer />
      </div>
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
        }=
      `}</style>
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          height: 100vh;
          padding: 1rem;
          box-sizing: border-box;
        }
        .root > * {
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default Layout;
