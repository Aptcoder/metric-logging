const request = require('supertest');
const { expect } = require('chai');
const fs = require('fs').promises;
const MetricStore = require('../utils/metricStore');
const app = require('../app');

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

describe('Metric route', () => {
  describe('GET /sum', () => {
    it('Should return sum of requested key', async () => {
      const res = await request(app)
        .get('/api/metric/asset_value/sum')
        .expect(200);
      expect(res.body).to.have.property('value');
      expect(res.body.value).to.eql(150);
    });
  });

  describe('POST /', () => {
    it('Should add metric value to store', async () => {
      const res = await request(app)
        .post('/api/metric/asset_value')
        .send({ value: 345 })
        .expect(200);
      expect(res.body).to.eql({});
      const data = await MetricStore.readStore();
      expect(data).to.have.property('asset_value');
      expect(Object.values(data.asset_value)).to.include(345);
    });
  });
});
