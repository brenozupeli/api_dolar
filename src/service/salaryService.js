class DollarService {
  constructor({ dollarRepository }) {
    this.dollarRepository = dollarRepository;
  }

  async calculate(valueInSourceCurrency, targetCurrency = 'BRL') {
    const result = await this.dollarRepository.find(targetCurrency);
    if (result) {
      return (valueInSourceCurrency * result.value).toFixed(2);
    }
    return undefined;
  }
}

module.exports = DollarService;
