const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../server");
const User = require("../../models/User");
const generateToken = require("../../utils/generateToken");

jest.mock("../../models/User");
jest.mock("../../utils/generateToken");

// Test suite for user authentication API
describe("User Authentication API", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });


    // Test suite for user registration
    describe("User Registration", () => {

        // Test case for new user registration
        it("should register a new user successfully", async () => {
            const mockUser = {
                _id: "67c2886800d5eacd42abf998",
                name: "Kavini",
                email: "kavini@gmail.com",
                password: "hashed-password"
            };

            User.findOne.mockResolvedValue(null); // No existing user
            User.create.mockResolvedValue(mockUser); // Mock user creation
            generateToken.mockReturnValue("mock-jwt-token");

            const res = await request(app)
                .post("/api/auth/register")
                .send({
                    name: "Kavini",
                    email: "kavini@gmail.com",
                    password: "Test@1234"
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("_id", mockUser._id);
            expect(res.body).toHaveProperty("name", mockUser.name);
            expect(res.body).toHaveProperty("email", mockUser.email);
            expect(res.body).toHaveProperty("token", "mock-jwt-token");
        });

        // Test case for user registration for existing user
        it("should return error if user already exists", async () => {
            User.findOne.mockResolvedValue({ email: "kavini@gmail.com" });

            const res = await request(app)
                .post("/api/auth/register")
                .send({
                    name: "Kavini",
                    email: "kavini@gmail.com",
                    password: "Test@1234"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("message", "User already exists");
        });

        // Test case for invalid user data
        it("should return error for invalid user data", async () => {
            User.findOne.mockResolvedValue(null); // No existing user
            User.create.mockResolvedValue(null); // Simulate failure

            const res = await request(app)
                .post("/api/auth/register")
                .send({
                    name: "",
                    email: "invalid-email",
                    password: "123"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("message", "Invalid user data");
        });
    });

    
    // Test suite for user login
    describe("User Login", () => {

        // Test case for user login
        it("should login a user successfully", async () => {
            const mockUser = {
                _id: "67cfb600d9ddd7caa756e512",
                name: "Kavini",
                email: "kavini@gmail.com",
                matchPassword: jest.fn().mockResolvedValue(true)
            };

            User.findOne.mockResolvedValue(mockUser);
            generateToken.mockReturnValue("mock-jwt-token");

            const res = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "kavini@gmail.com",
                    password: "Test@1234"
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("_id", mockUser._id);
            expect(res.body).toHaveProperty("name", mockUser.name);
            expect(res.body).toHaveProperty("email", mockUser.email);
            expect(res.body).toHaveProperty("token", "mock-jwt-token");
        });

        // Test case for invalid credentials
        it("should return error for invalid credentials", async () => {
            const mockUser = {
                _id: "67c2886800d5eacd42abf998",
                name: "Kavini",
                email: "kavini@gmail.com",
                matchPassword: jest.fn().mockResolvedValue(false)
            };

            User.findOne.mockResolvedValue(mockUser);

            const res = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "kavini@gmail.com",
                    password: "wrongpassword"
                });

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty("message", "Invalid email or password");
        });

        // Test case for non-existent user
        it("should return error if user does not exist", async () => {
            User.findOne.mockResolvedValue(null);

            const res = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "nonexistent@gmail.com",
                    password: "Test@1234"
                });

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty("message", "Invalid email or password");
        });
    });
});