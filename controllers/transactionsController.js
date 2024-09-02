const Transaction = require("../models/Transaction");

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      name: req.body.name,
      email: req.body.email,
      amount: req.body.amount,
      transactionDate: req.body.transactionDate || Date.now(),
      transactionType: req.body.transactionType,
      description: req.body.description || "No description provided",
      status: req.body.status || "pending",
      accountNumber: req.body.accountNumber,
      transactionId: req.body.transactionId,
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
