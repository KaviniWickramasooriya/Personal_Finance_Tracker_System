const express = require('express');
const { setBudget, getBudgets, updateBudget, deleteBudget } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, setBudget); // Create a new budget
router.get('/', protect, getBudgets); // Get all budgets
router.put('/:id', protect, updateBudget); // Update a budget
router.delete('/:id', protect, deleteBudget); // Delete a budget

module.exports = router;
