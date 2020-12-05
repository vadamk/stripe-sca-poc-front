const express = require('express');
const next = require('next');
const fs = require('fs');
const util = require('util');

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

require('dotenv').config({ path: `./.env` });

const port = process.env.PORT || 3000;
const app = next({
  dev: process.env.NODE_ENV !== 'production',
});

const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  server.get('*', (req, res) => {
    handle(req, res);
  });

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
