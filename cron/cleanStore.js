const fs = require('fs').promises;
const MetricStore = require('../utils/metricStore');

module.exports = async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  try {
    const store = await MetricStore.readStore();
    Object.values(store).forEach((keyValues) => {
      Object.keys(keyValues).forEach((time) => {
        if (new Date(time) < new Date(oneHourAgo)) {
          // eslint-disable-next-line no-param-reassign
          delete keyValues[time];
        }
      });
    });

    await fs.writeFile('./metric-store.json', JSON.stringify(store, null, 2));
  } catch (err) {
    //
  }
};
