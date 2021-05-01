const express = require('express');

class DollarRouter {
  constructor({ dollarService }) {
    this.dollarService = dollarService;

    this.router = express.Router();
  }
  getRoutes() {
    this.router.get('/dollar', async (req, res) => {
      const { currency } = req.query;

      const value = await this.dollarService.find(currency);
      if (value) {
        return res.status(200).send({ value, currency });
      }
      return res.sendStatus(404);
    });

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
