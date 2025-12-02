// Import required modules
require('dotenv').config({ path: './config/.env' });
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

// Initialize Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// ===== DATABASE CONNECTION =====
// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// ===== REST API ROUTES =====

/**
 * GET /api/users
 * Description: Retrieve all users from the database
 * Response: Array of all user documents
 */
app.get('/api/users', async (req, res) => {
  try {
    // Use mongoose find() method to retrieve all users
    const users = await User.find();
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

/**
 * POST /api/users
 * Description: Create and add a new user to the database
 * Request body: { name, email, age, phone, city }
 * Response: The newly created user document
 */
app.post('/api/users', async (req, res) => {
  try {
    // Destructure user data from request body
    const { name, email, age, phone, city } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required fields'
      });
    }

    // Create a new user instance using mongoose model
    const newUser = new User({
      name,
      email,
      age,
      phone,
      city
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: savedUser
    });
  } catch (error) {
    // Handle duplicate email or validation errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(400).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

/**
 * PUT /api/users/:id
 * Description: Edit/update an existing user by their ID
 * URL parameter: id (User's MongoDB ID)
 * Request body: Fields to update { name, email, age, phone, city }
 * Response: The updated user document
 */
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate if the provided ID is a valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    // Use mongoose findByIdAndUpdate to update the user
    // { new: true } returns the updated document
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(400).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
});

/**
 * DELETE /api/users/:id
 * Description: Remove a user from the database by their ID
 * URL parameter: id (User's MongoDB ID)
 * Response: Confirmation of deletion with deleted user data
 */
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the provided ID is a valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    // Use mongoose findByIdAndDelete to remove the user
    const deletedUser = await User.findByIdAndDelete(id);

    // Check if user exists
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

// ===== ERROR HANDLING =====
// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ===== SERVER STARTUP =====
// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
