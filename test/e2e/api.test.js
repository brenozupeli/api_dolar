const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const request = require('supertest');
const rewiremock = require('rewiremock/node');
const MockRepository = require('../mocks/dollar');
const mockDatabase = require('../mocks/database');

const SERVER_TEST_PORT = 4000;

rewiremock(() => require('../../src/repository/dollarRepository')).with(
  MockRepository
);

describe('End2End API Suite test', () => {
  let app = {};

  before(() => {
    rewiremock.enable();
    const api = require('./../../src');

    const DollarFactory = require('../../src/factory/dollarFactory');
    const SalaryFactory = require('../../src/factory/salaryFactory');
    const dollarService = DollarFactory.createInstance();
    const salaryService = SalaryFactory.createInstance();

    const instance = api({ dollarService, salaryService });

    app = {
      instance,
      server: instance.initialize(SERVER_TEST_PORT),
    };
  });

  after(() => {
    rewiremock.disable();
  });

  it('get USD value in BRL', async () => {
    const currency = 'BRL';
    const expected = mockDatabase.find((item) => item.currency === currency);
    const response = await request(app.server).get('/dollar').expect(200);

    expect(response.body).to.be.deep.equal({ value: expected.value });
  });

  it('given a non existent currency it should return a not found error', async () => {
    const currency = 'ARS';
    await request(app.server).get('/dollar').query({ currency }).expect(404);
  });

  it('given a non existent currency and a value it should return a successfully created status', async () => {
    const currency = 'ARS';
    const value = 0.05;
    await request(app.server)
      .post('/dollar')
      .send({ currency, value })
      .expect(201);
  });

  it('given a existent currency and a value it should return a success status', async () => {
    const currency = 'ARS';
    const value = 0.05;
    await request(app.server)
      .post('/dollar')
      .send({ currency, value })
      .expect(200);
  });

  it('given only a value it should update BRL value and return a success status', async () => {
    const value = 5.5;
    await request(app.server).post('/dollar').send({ value }).expect(200);
  });

  it('given a valid salary it should calculate salary in BRL', async () => {
    const currency = 'BRL';
    const salary = 1500;
    const expected = {
      value: (
        mockDatabase.find((item) => item.currency === currency).value * salary
      ).toFixed(2),
    };

    const response = await request(app.server)
      .get('/salary')
      .query({ salary })
      .expect(200);

    expect(response.body).to.be.deep.equal(expected);
  });

  it('given a invalid salary it should return bad request error', async () => {
    const salary = 1250;

    await request(app.server).get('/salary').query({ salary }).expect(400);
  });

  it('given a NaN as salary it should return bad request error', async () => {
    const salary = 'a';

    await request(app.server).get('/salary').query({ salary }).expect(400);
  });

  it('given a non existent target currency it should return not found error', async () => {
    const salary = 1500;
    const targetCurrency = 'a';

    await request(app.server)
      .get('/salary')
      .query({ targetCurrency, salary })
      .expect(404);
  });
});
