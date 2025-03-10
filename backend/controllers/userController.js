const User = require('../models/User');

// Get All Users (Only users)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get Single User by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, role: 'user' }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update User
const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Ensure the user is updating their own profile
        if (req.user._id.toString() !== req.params.id) {
            return res.status(403).json({ message: 'Not authorized to update this profile' });
        }

        // Find the user using the token ID
        const user = await User.findOne({ _id: req.user._id, role: 'user' });

        if (!user) {
            return res.status(404).json({ message: 'User not found or not authorized' });
        }

        // Update only provided fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password; // ✅ Will be hashed by Mongoose `pre('save')`

        // Save updated user (Triggers `pre('save')` for password hashing)
        await user.save();

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            message: 'User updated successfully'
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id, role: 'user' });

        if (!user) {
            return res.status(404).json({ message: 'User not found or not authorized' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

module.exports = { getUsers, getUserById, updateUser, deleteUser };