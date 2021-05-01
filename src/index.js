'use strict';
require('dotenv').config();

const { PORT, MONGODB_CONNECTION_STRING } = process.env;

const express = require('express');
const Database = require('./util/database');

const DollarFactory = require('./factory/dollarFactory');
const SalaryFactory = require('./factory/salaryFactory');

const DollarRouter = require('./routes/dollar');
const SalaryRouter = require('./routes/salary');

class Api {
  constructor({ dollarService, salaryService }) {
    this.dollarService = dollarService;
    this.salaryService = salaryService;
  }

  connectDatabase() {
    const database = new Database({
      connectionString: MONGODB_CONNECTION_STRING,
    });
    database.connect();
  }

  initialize(port = PORT) {
    const app = express();
    app.use(express.json());

    const dollarRouter = new DollarRouter({
      dollarService: this.dollarService,
    });

    const salaryRouter = new SalaryRouter({
      salaryService: this.salaryService,
    });

    app.use(dollarRouter.getRoutes());
    app.use(salaryRouter.getRoutes());

    app.listen(port, () => console.log('Server running!'));

    return app;
  }
}

if (process.env.NODE_ENV !== 'test') {
  const api = new Api({
    dollarService: DollarFactory.createInstance(),
    salaryService: SalaryFactory.createInstance(),
  });

  api.connectDatabase();
  api.initialize();
}

module.exports = (dependencies) => new Api(dependencies);
