const express = require('express');
const path = require('path');
const Html = require('./Html');

const port = process.env.WEB_PORT;
const env = process.env.NODE_ENV;
const isWindows = process.env.COMPOSE_CONVERT_WINDOWS_PATHS === '1';

const app = new express();

if (env === 'development') {
  /* eslint-disable import/no-extraneous-dependencies */
  const createWebpackCompiler = require('@space-miner/webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  /* eslint-enable import/no-extraneous-dependencies */
  const publicPath = '/dist/';
  const poll = isWindows ? 1000 : false;
  const watchOptions = {
    poll,
    aggregateTimeout: 300,
  };
  const compiler = createWebpackCompiler({ cwd: __dirname, entry: path.join('client', 'index.js'), publicPath });
  app.use(webpackDevMiddleware(compiler, {
    publicPath,
    watchOptions,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.get('/dist/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', req.url));
});

app.get('/*', (req, res, next) => {
  res.send(Html({ scripts: ['/dist/vendor.js', '/dist/main.js'] }))
});

app.listen(port, () => console.log(`App running on port ${port}`));
