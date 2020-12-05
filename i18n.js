const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
console.log('localeSubpaths: ', localeSubpaths);

module.exports = new NextI18Next({
  defaultLanguage: 'sw',
  otherLanguages: ['en'],
  localeSubpaths,
  localePath: './public/static/locales'
});
