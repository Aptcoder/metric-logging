const fs = require('fs').promises;
const { expect } = require('chai');
const MetricStore = require('../utils/metricStore');

const store = {
  asset_value: {
    [new Date().toISOString()]: 123,
    [new Date(new Date() - 20 * 60 * 1000).toISOString()]: 27,
    [new Date(new Date() - 80 * 60 * 1000).toISOString()]: 45,
    [new Date(new Date() - 134 * 60 * 1000).toISOString()]: 40
  }
};

beforeEach(async () => {
  await fs.writeFile('./test/mock/metric-store.json', JSON.stringify(store, null, 2));
});

describe('Store for management the metrics', () => {
  it('Should read correct data from store', async () => {
    const data = await MetricStore.readStore();
    expect(data).to.eql(store);
  });

  // test write to store
  it('Should write correctly to the store when key already exists', async () => {
    await MetricStore.writeToStore('asset_value', 348);
    const data = await MetricStore.readStore();
    expect(data).to.have.property('asset_value');
    expect(Object.values(data.asset_value)).to.include(348);
  });

  it('Should write correctly to the store when key does not exist', async () => {
    await MetricStore.writeToStore('new_value', 348);
    const data = await MetricStore.readStore();
    expect(data).to.have.property('new_value');
    expect(Object.values(data.new_value)).to.include(348);
  });

  it('Should get correct sum from store', async () => {
    const sum = await MetricStore.getSumForKey('asset_value');
    expect(sum).to.equal(150);
  });
});
