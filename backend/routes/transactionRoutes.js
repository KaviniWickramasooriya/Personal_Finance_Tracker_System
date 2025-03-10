const express = require('express');
const { addTransaction, getTransactions, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addTransaction); // Create a new transaction
router.get('/', protect, getTransactions); // Get all transactions
router.put('/:id', protect, updateTransaction); // Update a transaction
router.delete('/:id', protect, deleteTransaction); // Delete a transaction

module.exports = router;
