/* eslint-disable no-prototype-builtins */
const fs = require('fs').promises;

class MetricStore {
  static async readStore() {
    const pathToUse = process.env.NODE_ENV === 'testing' ? './test/mock/metric-store.json' : './metric-store.json';
    try {
      const data = await fs.readFile(pathToUse);
      return JSON.parse(data);
    } catch (err) {
      throw new Error(err.message);
    //   console.log('Error in reading from store', err);
    }
  }

  static async writeToStore(key, value) {
    const pathToUse = process.env.NODE_ENV === 'testing' ? './test/mock/metric-store.json' : './metric-store.json';
    try {
      const store = await MetricStore.readStore();
      // eslint-disable-next-line no-prototype-builtins
      if (store.hasOwnProperty(key)) {
        store[key][new Date().toISOString()] = value;
      } else {
        store[key] = {
          [new Date().toISOString()]: value
        };
      }
      await fs.writeFile(pathToUse, JSON.stringify(store, null, 2));
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async getSumForKey(key) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    try {
      const store = await MetricStore.readStore();
      if (!store.hasOwnProperty(key)) {
        return null;
      }
      // metric values is an array of all properties of the key in the store in a [key, value] array
      const metricValues = Object.entries(store[key]);
      const sum = metricValues.reduce((accumulator, current) => {
        // if current.key is less than one hour ago, do not use
        if (new Date(current[0]) < new Date(oneHourAgo)) {
          return accumulator;
        }
        return accumulator + parseInt(current[1], 10);
      }, 0);
      return sum;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

// FileManager.readStore();
// FileManager.writeToStore('tope', 128);
// FileManager.readStore();
module.exports = MetricStore;
