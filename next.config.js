const { nextI18NextRewrites } = require('next-i18next/rewrites')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const localeSubpaths = {
  en: 'en',
}

module.exports = withBundleAnalyzer({
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  images: {
    domains: ['go-monday.s3.eu-north-1.amazonaws.com'],
  }
});
