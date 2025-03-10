const express = require("express");
const {createGoal, getGoals, updateGoal, deleteGoal} = require("../controllers/goalController");
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/", protect, createGoal); // Create a new goal
router.get("/", protect, getGoals); // Get all goals
router.put("/:id", protect, updateGoal); // Update a goal
router.delete("/:id", protect, deleteGoal); // Delete a goal

module.exports = router;
