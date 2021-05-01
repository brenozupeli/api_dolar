const database = require('./database');

class MockRepository {
  constructor() {
    this.database = database;
  }
  find = async (currency) =>
    this.database.find((item) => item.currency === currency);
  upsert = async (currency, value) => {
    const index = this.database.findIndex((item) => item.currency === currency);
    if (index >= 0) {
      const previousValue = { ...this.database[index] };
      this.database[index] = { ...this.database[index], value };
      return previousValue;
    }
    this.database.push({ value, currency });
    return null;
  };
}

module.exports = MockRepository;
