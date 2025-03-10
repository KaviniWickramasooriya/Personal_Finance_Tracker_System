const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    convertedAmount: { type: Number }, // Converted amount based on selected currency
    convertedCurrency: { type: String },
    category: { type: String, required: true },
    tags: [{ type: String }],
    description: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);