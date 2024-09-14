const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  balance: { type: Number, default: 0 },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
