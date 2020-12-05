import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import { appWithTranslation } from '../i18n';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <script id="stripe-js" src="https://js.stripe.com/v3/" defer />
    </Head>
    <Component {...pageProps} />
  </>
);

MyApp.getInitialProps = async (appContext) => {
  return { ...await App.getInitialProps(appContext) }
}

export default appWithTranslation(MyApp)