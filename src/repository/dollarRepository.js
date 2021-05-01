class DollarRepository {
  constructor({ dollarModel }) {
    this.dollarModel = dollarModel;
  }
  find(currency) {
    return this.dollarModel
      .findOne({ currency }, { _id: 0, value: 1, currency: 1 })
      .lean();
  }

  upsert(currency, value) {
    return this.dollarModel.findOneAndUpdate(
      { currency },
      { value },
      { upsert: true }
    );
  }
}
module.exports = DollarRepository;
