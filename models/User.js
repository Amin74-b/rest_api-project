// Import mongoose library
const mongoose = require('mongoose');

// Define the User Schema with fields for a user document
const userSchema = new mongoose.Schema(
  {
    // Name field - required string
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters']
    },
    
    // Email field - required, unique string
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    
    // Age field - optional number
    age: {
      type: Number,
      min: [0, 'Age cannot be negative'],
      max: [150, 'Age cannot exceed 150']
    },
    
    // Phone field - optional string
    phone: {
      type: String,
      trim: true
    },
    
    // City field - optional string
    city: {
      type: String,
      trim: true
    }
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true
  }
);

// Create and export the User model based on the userSchema
module.exports = mongoose.model('User', userSchema);
