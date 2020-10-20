const fs = require('fs').promises;

class MetricStore {
  static async readStore() {
    try {
      const data = await fs.readFile('./metric-store.json');
      console.log('data', data);
      return JSON.parse(data);
    } catch (err) {
      throw new Error(err.message);
    //   console.log('Error in reading from store', err);
    }
  }

  static async writeToStore(key, value) {
    try {
      const store = await MetricStore.readStore('./metric-store.json');
      // eslint-disable-next-line no-prototype-builtins
      if (store.hasOwnProperty(key)) {
        store[key][new Date().toISOString()] = value;
      } else {
        store[key] = {
          [new Date().toISOString()]: value
        };
      }
      await fs.writeFile('./metric-store.json', JSON.stringify(store, null, 2));
    } catch (err) {
      console.log('Error in writing to store', err);
      throw new Error(err.message);
    }
  }
}

// FileManager.readStore();
// FileManager.writeToStore('tope', 128);
// FileManager.readStore();
module.exports = MetricStore;
