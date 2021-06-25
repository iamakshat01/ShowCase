const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  tagline: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

module.exports = mongoose.model('User', userSchema);
