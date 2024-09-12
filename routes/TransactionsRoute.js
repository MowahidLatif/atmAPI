const express = require("express");
const transactionController = require("../controllers/transactionsController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, transactionController.getTransactions);
router.post("/", verifyToken, transactionController.createTransaction);

module.exports = router;
