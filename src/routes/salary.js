const express = require('express');

class DollarRouter {
  constructor({ salaryService }) {
    this.salaryService = salaryService;
    this.MIN_SALARY = 1256.7;

    this.router = express.Router();
  }
  getRoutes() {
    /**
     * @swagger
     * /salary:
     *  get:
     *    description: Consultar o valor do salário em uma moeda especificada
     *    parameters:
     *      - in: query
     *        name: targetCurrency
     *        schema:
     *          type: string
     *        required: false
     *        description: A moeda a ser usada no cálculo, o valor padrão é 'USD'
     *      - in: query
     *        name: salary
     *        schema:
     *          type: number
     *        required: true
     *        description: O valor do salário em dólar (USD)
     *    responses:
     *      '200':
     *        description: O valor do salário na moeda requisitada
     *        content:
     *          application/json:
     *            schema:
     *              value: number
     *      '400':
     *        description: O salário não foi informado, está em um formato inválido ou é menor que o salário mínimo
     *      '404':
     *        description: A moeda solicitada não está cadastrada
     */
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
