const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
    minLength: 3,
    maxLength: 50,
    trim: true,
  },

  lastName: {
    type: String,
    required: [true, "Please provide your last  name"],
    minLength: 3,
    maxLength: 50,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please provide an email"],
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },

  password: {
    type: String,
    required: [true, "Please provide a valid password"],
    minLength: 5,
  },

  profileImage: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2020/06/10/08/46/arara-5281847_960_720.jpg",
  },

  address: {
    type: String,
    default: "",
  },

  publicImageId: {
    type: String,
  },

  role: {
    type: String,
    enum: ["admin", "user", "staff"],
    default: "user",
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
