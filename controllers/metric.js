const { ErrorHandler } = require('../utils/errors');
const MetricStore = require('../utils/metricStore');

const postMetricValue = async (req, res, next) => {
  const { key } = req.params;
  const { value } = req.body;

  if (!value || Number.isNaN(value)) {
    return next(new ErrorHandler(400, 'A valid numeric metric value is required'));
  }
  try {
    await MetricStore.writeToStore(key, Math.round(value));
    return res.send({});
  } catch (err) {
    return next(err);
  }
};

const getKeyValuesSum = async (req, res, next) => {
  const { key } = req.params;
  try {
    const sum = await MetricStore.getSumForKey(key);
    if (!sum) {
      throw new ErrorHandler(404, 'Key not found');
    }
    return res.send({ value: sum });
  } catch (err) {
    return next(err);
  }
};

module.exports = { postMetricValue, getKeyValuesSum };
