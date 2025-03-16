const Goal = require("../models/Goal");

// Create Goal
exports.createGoal = async (req, res) => {
    try {
        const { title, targetAmount, deadline } = req.body;

        const goal = new Goal({ user: req.user.id, title, targetAmount, deadline });

        await goal.save();
        res.status(201).json({message: "Goal created Succesfully", goal});
    } catch (error) {
        res.status(500).json({ message: "Error creating goal", error });
    }
};

// Get Goals
exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user.id });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: "Error fetching goals", error });
    }
};

// Update Goal
exports.updateGoal = async (req, res) => {
    try {
        const { savedAmount } = req.body;
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: "Goal not found" });

        goal.savedAmount += savedAmount;
        if (goal.savedAmount >= goal.targetAmount) goal.status = "Completed";

        await goal.save();
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ message: "Error updating goal", error });
    }
};

// Delete Goal
exports.deleteGoal = async (req, res) => {
    try {
        await Goal.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Goal deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting goal", error });
    }
};