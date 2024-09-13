const express = require("express");
const accountController = require("../controllers/accountsController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/createAccount", verifyToken, accountController.createAccount);
router.post("/getAccounts", verifyToken, accountController.getAccounts);
router.get("/getAccountByID", verifyToken, accountController.getAccountById);
router.post("/updateAccount", verifyToken, accountController.updateAccount);
router.post("/deleteAccount", verifyToken, accountController.deleteAccount);

module.exports = router;
