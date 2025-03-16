const Budget = require('../models/Budget');
const Category = require('../models/Category');

//  Set Budget
const setBudget = async (req, res) => {
    try {
        const { category, limit } = req.body;

        const existCategory = await Category.findOne({ categoryType: category });
        if (!existCategory) {
            return res.status(400).json({ message: `Invalid category: ${category}. Please select a valid category.` });
        }

        //  Check if user already has a budget for this category
        const existingBudget = await Budget.findOne({ user: req.user._id, category });
        if (existingBudget) {
            return res.status(400).json({ message: `You already have a budget set for the category: ${category}.` });
        }

        const budget = await Budget.create({
            user: req.user._id,
            category,
            limit
        });
        res.status(201).json({message:'Budget setting success', budget});
    } catch (error) {
        res.status(500).json({ message: 'Error setting budget', error });
    }
};

// Get All Budgets (Auto-update spent amount)
const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user._id });

        //  Update spent amount for each budget before sending response
        for (let budget of budgets) {
            await budget.updateSpentAmount();
        }

        res.status(200).json({ message: 'Budgets retrieved successfully', budgets });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving budgets', error });
    }
};

//  Update Budget
const updateBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget || budget.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const { category, limit } = req.body;

        //  Check if category exists only if provided
        if (category) {
            const existingCategory = await Category.findOne({ categoryType: category });
            if (!existingCategory) {
                return res.status(400).json({ message: `Invalid category: ${category}. Please select a valid category.` });
            }

            //  Prevent duplicate budgets for the same user & category
            const existingBudget = await Budget.findOne({ user: req.user._id, category });
            if (existingBudget && existingBudget._id.toString() !== budget._id.toString()) {
                return res.status(400).json({ message: `You already have a budget set for the category: ${category}.` });
            }

            budget.category = category;
        }

        //  Update limit if provided
        if (limit) {
            budget.limit = limit;
        }

        //  Save the updated budget
        const updatedBudget = await budget.save();

        res.status(200).json({ message: "Budget updated successfully", updatedBudget });

    } catch (error) {
        res.status(500).json({ message: 'Error updating budget', error });
    }
};

//  Delete Budget
const deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget || budget.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await budget.deleteOne();
        res.status(200).json({ message: 'Budget deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting budget', error });
    }
};

module.exports = { setBudget, getBudgets, updateBudget, deleteBudget };