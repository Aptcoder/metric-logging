// Third party modules
const express = require('express');
const bodyParser = require('body-parser');

// App modules
// const metricRouter = require('./routes/metricRoutes');
const { handleError } = require('./utils/errors');
const FileManager = require('./utils/fileManager');
// express app
const app = express();

app.use(bodyParser.json());

// app.use('/metric', metricRouter);

// express error handling
app.use((err, req, res, next) => handleError(res, err));

// unknown endpoint handler
app.use('*', (req, res) => {
  const url = req.originalUrl;
  res.status(404).send({
    message: `Oops. endpoint ${req.method} ${url} not found on this API`
  });
});
module.exports = app;
