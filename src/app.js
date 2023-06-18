const express = require('express');
const apiRoutes = require('./routes/api');
const InMemoryDB = require('./data/InMemoryDB');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.port;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ api: 'ok' });
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  InMemoryDB.getInstance().initialize();
  console.log(`App listening on port ${port}`);
});

module.exports = app;
