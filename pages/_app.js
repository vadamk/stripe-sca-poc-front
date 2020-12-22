import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import { appWithTranslation } from '../i18n';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <script id="stripe-js" src="https://js.stripe.com/v3/" defer />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>
    <Component {...pageProps} />
    <style jsx global>{`
      html, body {
        margin: 0;
        padding: 0;
      }

      @-webkit-keyframes rotating /* Safari and Chrome */ {
        from {
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        to {
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      @keyframes rotating {
        from {
          -ms-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        to {
          -ms-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      .rotating {
        -webkit-animation: rotating 2s linear infinite;
        -moz-animation: rotating 2s linear infinite;
        -ms-animation: rotating 2s linear infinite;
        -o-animation: rotating 2s linear infinite;
        animation: rotating 2s linear infinite;
      }
    `}</style>
  </>
);

MyApp.getInitialProps = async (appContext) => {
  return { ...await App.getInitialProps(appContext) }
}

export default appWithTranslation(MyApp)