const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  type: { type: String, required: true },
  balance: { type: Number, default: 0 },
  transactions: [
    {
      type: { type: String, enum: ["credit", "debit"], required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
