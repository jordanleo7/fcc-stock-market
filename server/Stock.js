const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Stock', stockSchema);