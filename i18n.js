const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

console.log('process.env.ENV: ', process.env.NODE_ENV);

module.exports = new NextI18Next({
  defaultLanguage: 'sw',
  otherLanguages: ['en'],
  localeSubpaths,
  localePath: path.resolve(
    process.env.NODE_ENV !== 'production'
      ? './public/static/locales'
      : './out_publish/static/locales'
  )
});
