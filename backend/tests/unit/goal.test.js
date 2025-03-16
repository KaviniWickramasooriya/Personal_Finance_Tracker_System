const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../server");
const Goal = require("../../models/Goal");

jest.mock("../../models/Goal");
jest.mock("../../middleware/authMiddleware", () => ({
  verifyToken: jest.fn().mockImplementation((req, res, next) => {
    req.user = { id: "mockUserId" };  // Mock the user
    next();
  }),
}));

// Test suite for Goal Management API
describe("Goal Management API", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test suite for Create Goal
  describe("Create Goal", () => {

    // Test case whether the user is authenticated
    it("should create a goal successfully", async () => {
      const mockGoal = {
        _id: "660b1234abc567def8901234",
        user: "67c2886800d5eacd42abf998",
        title: "Save for loan repayment",
        targetAmount: 10000,
        deadline: "2025-10-16",
        savedAmount: 0,
        status: "In Progress",
      };

      // Mock the save function of the Goal model to resolve with mockGoal
      Goal.prototype.save = jest.fn().mockResolvedValue(mockGoal);

      const mockToken = "mock-jwt-";  // Set the mock token for Authorization

      const res = await request(app)
        .post("/api/goals")
        .send({
          title: "Save for loan repayment",
          targetAmount: 10000,
          deadline: "2025-10-16",
        })
        .set("Authorization", `Bearer ${mockToken}`);  // Set Authorization header with mock token

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "Goal created Successfully");
      expect(res.body.goal).toHaveProperty("title", "Save for loan repayment");
      expect(res.body.goal).toHaveProperty("targetAmount", 10000);
    });

    // Test case whether the user is not authenticated
    it("should return an error if goal creation fails", async () => {
      // Simulate an error during the save process
      Goal.prototype.save = jest.fn().mockRejectedValue(new Error("Error creating goal"));

      const mockToken = "";  // Set the mock token for Authorization

      const res = await request(app)
        .post("/api/goals")
        .send({
          title: "Save for loan repayment",
          targetAmount: 10000,
          deadline: "2025-10-16",
        })
        .set("Authorization", `Bearer ${mockToken}`);

      expect(res.statusCode).toBe(500);  // Expect an internal server error
      expect(res.body).toHaveProperty("message", "Error creating goal");
    });
  });
});