const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {
  en: 'en',
}

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  target: 'serverless',
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    API_URL: process.env.API_URL,
    API_REST_URL: process.env.API_REST_URL,
    PORT: process.env.PORT,
  },
}
