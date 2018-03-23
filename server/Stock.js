const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  ticker: String
});

module.exports = mongoose.model('stock-market-app-stock', stockSchema);