const bodyParser = require('body-parser');
const express = require('express');
const config = require('@space-miner/app-config').default;

const app = new express();

app.use(bodyParser.json());
app.get('/*', (req, res) => {
  res.status(200).send('hello world');
});
app.listen(config.apiPort, () => console.log(`App running on port ${config.apiPort}`));
