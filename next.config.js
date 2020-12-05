const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {
  en: 'en',
}

module.exports = withBundleAnalyzer({
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  target: 'serverless',
  env: {
    STRIPE_SECRET_KEY: res.parsed.STRIPE_SECRET_KEY,
    API_URL: res.parsed.API_URL,
    API_REST_URL: res.parsed.API_REST_URL,
    PORT: res.parsed.PORT,
  },
});
