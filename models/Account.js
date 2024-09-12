const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  type: { type: String, required: true },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
