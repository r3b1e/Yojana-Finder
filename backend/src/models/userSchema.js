const mongoose = require("mongoose");

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254, // RFC max
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(v),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 60, 
      maxlength: 100, 
    },
    gender: {
      type: String,
      enum: GENDERS,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
