const request = require('supertest');
const app = require('../../server'); // Assuming your express app is in server.js or similar
const User = require('../../models/User');
const mongoose = require('mongoose');

// Use MongoDB Atlas connection string
const mongoUri = 'mongodb+srv://kaviniwickramasooriya:kavini123@cluster0.vlcf9.mongodb.net/Finance_Tracker?retryWrites=true&w=majority&appName=Cluster0';

let createdUserId = null;

// Check if mongoose is already connected, otherwise connect
beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        // Connect to MongoDB Atlas before tests run
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
});

afterAll(async () => {
    // Delete only the created user
    if (createdUserId) {
        await User.findByIdAndDelete(createdUserId);
    }
    await mongoose.connection.close();
});

// Test suite for user registration and login
describe('User Registration and Login', () => {

    // Test for new user registration
    it('should register a new user successfully', async () => {
        const newUser = {
            name: 'New User',
            email: 'newuser@example.com',
            password: 'password123',
        };

        const response = await request(app).post('/api/auth/register').send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body.name).toBe(newUser.name);
        expect(response.body.email).toBe(newUser.email);
    });

    // Test for existing user registration
    it('should return error if the user already exists', async () => {
        const existingUser = {
            name: 'Existing User',
            email: 'existinguser@example.com',
            password: 'password123',
        };

        // Register the user first
        await request(app).post('/api/auth/register').send(existingUser);

        // Try registering the same user again
        const response = await request(app).post('/api/auth/register').send(existingUser);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User already exists');
    });

    // Test for valid user data
    it('should login a registered user successfully', async () => {
        const loginUser = {
            email: 'newuser@example.com',
            password: 'password123',
        };

        const response = await request(app).post('/api/auth/login').send(loginUser);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body.name).toBe('New User');
        expect(response.body.email).toBe(loginUser.email);
    });

    // Test for invalid login credentials
    it('should return error if login credentials are incorrect', async () => {
        const loginUser = {
            email: 'newuser@example.com',
            password: 'password',
        };

        const response = await request(app).post('/api/auth/login').send(loginUser);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid email or password');
    });
});