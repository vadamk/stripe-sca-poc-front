const express = require('express');
const next = require('next');
const fs = require('fs');
const util = require('util');

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

require('dotenv').config({
  path: `./.env.${process.env.ENV || 'development'}`,
});

const port = process.env.PORT || 3003;
const app = next({
  dev: process.env.NODE_ENV !== 'production',
});

const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  // await nextI18next.initPromise;
  // server.use(nextI18NextMiddleware(nextI18next))

  let redirects = [];

  try {
    const redirectsJSON = await readFile('./redirects.json');
    redirects = JSON.parse(redirectsJSON).redirects;
  } catch (err) {
    console.error(err);
  }

  // redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
  //   server[method](from, (req, res) => {
  //     res.redirect(type, to);
  //   });
  // });

  server.get('*', (req, res) => {
    handle(req, res);
  });

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
