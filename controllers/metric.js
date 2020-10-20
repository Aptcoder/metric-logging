const { ErrorHandler } = require('../utils/errors');
const MetricStore = require('../utils/metricStore');

const postMetricValue = async (req, res, next) => {
  const { key } = req.params;
  const { value } = req.body;

  if (!value) {
    return next(new ErrorHandler(400, 'A metric value is required'));
  }
  try {
    await MetricStore.writeToStore(key, value);
    return res.send({});
  } catch (err) {
    return next(err);
  }
};

module.exports = { postMetricValue };
