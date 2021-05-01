const express = require('express');

class DollarRouter {
  constructor({ salaryService }) {
    this.salaryService = salaryService;
    this.MIN_SALARY = 1256.7;

    this.router = express.Router();
  }
  getRoutes() {
    this.router.get('/salary', async (req, res) => {
      const { salary, targetCurrency } = req.query;

      if (isNaN(salary)) return res.status(400).send('Salary is not a number.');

      const parsedSalary = parseFloat(salary);

      if (parsedSalary < this.MIN_SALARY)
        return res.status(400).send('Salary lower than minimum value.');

      const value = await this.salaryService.calculate(
        parsedSalary,
        targetCurrency
      );
      if (value) {
        return res.status(200).send({ value });
      }
      return res.sendStatus(404);
    });

    return this.router;
  }
}

module.exports = DollarRouter;
