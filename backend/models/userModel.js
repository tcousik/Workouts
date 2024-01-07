const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static signup method
userSchema.statics.signup = async function (email, password) {
  // Validation
  if (!email) {
    throw Error("Please enter an email address");
  }
  if (!password) {
    throw Error("Please enter a password");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("This email has already been used");
  }

  const salt = await bcrypt.genSalt(4);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  // Validation
  if (!email) {
    throw Error("Please enter an email address");
  }
  if (!password) {
    throw Error("Please enter a password");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
