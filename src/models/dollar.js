const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    currency: String,
    value: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('dollar', schema);
