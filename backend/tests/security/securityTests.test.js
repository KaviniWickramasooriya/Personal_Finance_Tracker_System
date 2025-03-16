const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { protect, adminProtect } = require('../../middleware/authMiddleware');

jest.mock('jsonwebtoken');
jest.mock('../../models/User');

// Test suite for the auth middleware
describe('Auth Middleware Tests', () => {
    let mockUser;
    let validToken;

    beforeEach(() => {
        mockUser = {
            _id: '67c2886800d5eacd42abf998',
            name: 'Kavini',
            email: 'kavini@gmail.com',
            role: 'user',
            select: jest.fn().mockResolvedValue(mockUser),
        };

        validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzI4ODY4MDBkNWVhY2Q0MmFiZjk5OCIsImlhdCI6MTc0MTcwNjY0MywiZXhwIjoxNzQ0Mjk4NjQzfQ.WobRAHFIans7DNrPG-rxKKEoUYsBTsUheNMusuw-5A4';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnThis(); 
        res.json = jest.fn();
        return res;
    };

    // Test the case where a valid token is provided
    test('✅ Should allow access with a valid token', async () => {
        // Mock the behavior of jwt.verify and User.findById
        jwt.verify.mockReturnValue({ id: mockUser._id });
        //User.findById.mockResolvedValue(mockUser); // Ensure User.findById resolves to the mock user
    
        const req = { headers: { authorization: `Bearer ${validToken}` } };
        const res = mockResponse(); 
        const next = jest.fn();
    
        // Call the protect middleware
        await protect(req, res, next);
    
        // Assert that the user is set in the request and next is called
        expect(req.user).toEqual(mockUser);
        expect(next).toHaveBeenCalled();
    });
    
    // Test the case where no token is provided
    test('❌ Should deny access if no token is provided', async () => {
        const req = { headers: {} };
        const res = mockResponse();
        const next = jest.fn();

        await protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'No token, access denied' });
    });

    // Test the case where an invalid token is provided
    test('❌ Should deny access for an invalid token', async () => {
        jwt.verify.mockImplementation(() => { throw new Error(); });

        const req = { headers: { authorization: 'Bearer invalid token' } };
        const res = mockResponse();
        const next = jest.fn();

        await protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized, invalid token' });
    });

    // Test the case where the user is not an admin
    test('❌ Should block non-admin users from admin routes', async () => {
        const req = { user: { role: 'user' } };
        const res = mockResponse();
        const next = jest.fn();

        adminProtect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Access denied, admin only' });
    });

    // Test the case where the user is an admin
    test('✅ Should allow admin users to access admin routes', async () => {
        const req = { user: { role: 'admin' } };
        const res = mockResponse();
        const next = jest.fn();

        adminProtect(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});