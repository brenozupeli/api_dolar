const mongoose = require('mongoose');

const DEFAULT_OPTIONS = {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

class Database {
  constructor({ connectionString, options = DEFAULT_OPTIONS }) {
    this.connectionString = connectionString;
    this.options = options;
  }

  connect() {
    mongoose.connect(this.connectionString, this.options);

    mongoose.connection.once('open', () => {
      console.log('Database connected:', this.connectionString);
    });

    mongoose.connection.on('error', (err) => {
      console.error('Connection error:', err);
    });
  }
}

module.exports = Database;
