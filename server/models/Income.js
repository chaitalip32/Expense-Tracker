const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: [0.01, "Amount must be greater than 0"] },
  category: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now, index: true },
  description: { type: String, default: '' },
});

module.exports = mongoose.model('Income', incomeSchema);
