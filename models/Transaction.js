const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  description: {
    type: String,
    default: "No description provided",
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  accountNumber: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    unique: true,
    required: true,
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);
