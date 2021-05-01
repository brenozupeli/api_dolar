const DollarRepository = require('../repository/dollarRepository');
const SalaryService = require('../service/salaryService');
const dollarModel = require('../models/dollar');

class SalaryFactory {
  static createInstance() {
    const dollarRepository = new DollarRepository({ dollarModel });
    const salaryService = new SalaryService({ dollarRepository });

    return salaryService;
  }
}

module.exports = SalaryFactory;
