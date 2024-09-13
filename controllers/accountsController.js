const Account = require("../models/Account");

// Create a new account
exports.createAccount = async (req, res) => {
  try {
    const { name, type, user } = req.body;

    // Validate required fields
    if (!name || !type || !user) {
      return res.status(400).json({
        success: false,
        error: "Name, type, and user are required fields.",
      });
    }

    const account = await Account.create({
      name,
      type,
      user,
      // balance is set to default (0) if not provided
      balance: req.body.balance || 0,
      // Initialize transactions array if provided
      transactions: req.body.transactions || [],
    });

    res.status(201).json({
      success: true,
      data: account,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all accounts
exports.getAccounts = async (req, res) => {
  try {
    // Populate the user field to get user details
    const accounts = await Account.find().populate("user", "name email");

    res.status(200).json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get a single account by ID
exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!account) {
      return res.status(404).json({
        success: false,
        error: "Account not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update an account's balance and add a transaction
exports.updateAccount = async (req, res) => {
  try {
    const { amount, transactionType, description } = req.body;

    if (!amount || !transactionType) {
      return res.status(400).json({
        success: false,
        error: "Amount and transaction type are required.",
      });
    }

    // Find the account by ID
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({
        success: false,
        error: "Account not found.",
      });
    }

    // Update balance based on transaction type
    if (transactionType === "credit") {
      account.balance += amount;
    } else if (transactionType === "debit") {
      account.balance -= amount;
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid transaction type.",
      });
    }

    // Add transaction to the transactions array
    account.transactions.push({
      type: transactionType,
      amount,
      description: description || "No description provided",
    });

    await account.save();

    res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete an account
exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);

    if (!account) {
      return res.status(404).json({
        success: false,
        error: "Account not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
