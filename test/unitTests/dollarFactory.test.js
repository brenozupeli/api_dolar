const { describe, it, beforeEach, afterEach } = require('mocha');
const rewiremock = require('rewiremock/node');
const { expect } = require('chai');
const MockRepository = require('../mocks/dollar');
const mockDatabase = require('../mocks/database');

rewiremock(() => require('../../src/repository/dollarRepository')).with(
  MockRepository
);

describe('Dollar Suite Tests', () => {
  beforeEach(() => {
    rewiremock.enable();
  });
  afterEach(() => {
    rewiremock.disable();
  });
  it('should get USD value in BRL', async () => {
    const currency = 'BRL';
    const expected = mockDatabase.find((item) => item.currency === currency)
      ?.value;

    const DollarFactory = require('../../src/factory/dollarFactory');

    const dollarService = await DollarFactory.createInstance();
    const result = await dollarService.find(currency);

    expect(result).to.be.equal(expected);
  });
  it('should insert a non existent currency and check previous and posterior values', async () => {
    const currency = 'ARS';
    const value = 0.05;

    const DollarFactory = require('../../src/factory/dollarFactory');

    const dollarService = await DollarFactory.createInstance();
    const previousValue = await dollarService.upsert(value, currency);
    expect(previousValue).to.be.null;

    const posteriorValue = await dollarService.find(currency);

    expect(posteriorValue).to.be.equal(value);
  });
});
