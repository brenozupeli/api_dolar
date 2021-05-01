class DollarService {
  constructor({ dollarRepository }) {
    this.dollarRepository = dollarRepository;
  }

  async find(currency = 'BRL') {
    const result = await this.dollarRepository.find(currency);

    if (result) {
      return result.value;
    }
    return undefined;
  }

  async upsert(value, currency = 'BRL') {
    return this.dollarRepository.upsert(currency, value);
  }
}
module.exports = DollarService;
