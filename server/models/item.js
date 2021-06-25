const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  photo: {
    data: Buffer,
    contentType: String,
  }
});

module.exports = mongoose.model('Item', itemSchema);
