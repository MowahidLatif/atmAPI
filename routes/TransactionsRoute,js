const express = require("express");
const transactionController = require("../controllers/transactionsController");
const router = express.Router();

router.get("/", transactionController.getTransactions);
router.post("/", transactionController.createTransaction);

module.exports = router;
