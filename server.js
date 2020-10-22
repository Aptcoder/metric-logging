const chalk = require('chalk');
const app = require('./app');
const cleanMetricStore = require('./cron/cleanStore');

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (!Number.isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
};
  // normalize and set the port
const port = normalizePort(process.env.PORT || '5000');

cleanMetricStore();

// create a http server
app.listen(port, () => {
  console.log(chalk.blue(`Server is listening on port ${port}`));
});
