const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {
  en: 'en',
}

const env = require('dotenv').config({
  path: `./.env.${process.env.ENV || 'development'}`,
});

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  target: 'serverless',
  env: {
    STRIPE_SECRET_KEY: env.parsed.STRIPE_SECRET_KEY,
    API_URL: env.parsed.API_URL,
    API_REST_URL: env.parsed.API_REST_URL,
    PORT: env.parsed.PORT,
  },
}
