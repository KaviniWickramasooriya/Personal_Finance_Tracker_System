const express = require('express');
const {addCategory, updateCategory, deleteCategory, getCategory} = require('../controllers/categoryController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, adminProtect, addCategory); // Create a new category
router.get('/',protect, adminProtect, getCategory); // Get all categories
router.put('/:id', protect, adminProtect, updateCategory); // Update a category
router.delete('/:id', protect, adminProtect, deleteCategory); // Delete a category

module.exports = router;
