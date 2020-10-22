// Third party modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// App modules
const metricRouter = require('./routes/metricRoutes');
const { handleError } = require('./utils/errors');
// express app
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/api/metric', metricRouter);

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
