const DollarRepository = require('../repository/dollarRepository');
const DollarService = require('../service/dollarService');
const dollarModel = require('../models/dollar');

class DollarFactory {
  static createInstance() {
    const dollarRepository = new DollarRepository({ dollarModel });
    const dollarService = new DollarService({ dollarRepository });

    return dollarService;
  }
}

module.exports = DollarFactory;
