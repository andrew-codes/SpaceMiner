const bodyParser = require('body-parser');
const express = require('express');
const getAppConfig = require('@space-miner/app-config').default;

const config = getAppConfig();
const env = process.env.NODE_ENV;
const port = process.env.API_PORT;

const app = new express();

app.use(bodyParser.json());

app.get('/*', (req, res) => {
  res.status(200).send('hello world');
});

app.listen(port, () => console.log(`App running on port ${port}`));
