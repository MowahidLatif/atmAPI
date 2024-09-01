const mongoose = require("mongoose");
const { Schema, Model } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = Model("User", userSchema);
