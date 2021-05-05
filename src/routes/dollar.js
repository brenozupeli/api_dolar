const express = require('express');

class DollarRouter {
  constructor({ dollarService }) {
    this.dollarService = dollarService;

    this.router = express.Router();
  }
  getRoutes() {
    /**
     * @swagger
     * /dollar:
     *  get:
     *    description: Usada para consultar o valor de uma moeda em Real (BRL)
     *    parameters:
     *      - in: query
     *        name: currency
     *        schema:
     *          type: string
     *        required: false
     *        description: A moeda a ser consutada, o valor padrão é 'USD'
     *    responses:
     *      '200':
     *        description: A moeda está cadastrada e o valor é retornado em Real (BRL)
     *        content:
     *          application/json:
     *            schema:
     *              value: number
     *      '404':
     *        description: A moeda solicitada não está cadastrada
     */
    this.router.get('/dollar', async (req, res) => {
      const { currency } = req.query;

      const value = await this.dollarService.find(currency);
      if (value) {
        return res.status(200).send({ value, currency });
      }
      return res.sendStatus(404);
    });

    /**
     * @swagger
     * /dollar:
     *  post:
     *    description: Usada para cadastrar o valor de uma moeda em Real (BRL)
     *    parameters:
     *      - in: body
     *        name: currency
     *        schema:
     *          type: string
     *        required: false
     *        description: A moeda a ser cadastrada, o valor padrão é 'USD'
     *      - in: body
     *        name: value
     *        schema:
     *          type: number
     *        required: true
     *        description: O valor da moeda a ser cadastrada, em BRL
     *    responses:
     *      '200':
     *        description: A moeda está cadastrada e o valor é retornado em Real (BRL)
     *        content:
     *          application/json:
     *            schema:
     *              value: number
     *      '404':
     *        description: A moeda solicitada não está cadastrada
     */
    this.router.post('/dollar', async (req, res) => {
      const { value, currency } = req.body;
      const previousValue = await this.dollarService.upsert(value, currency);
      if (previousValue) {
        return res.sendStatus(200);
      }
      return res.sendStatus(201);
    });

    return this.router;
  }
}

module.exports = DollarRouter;
