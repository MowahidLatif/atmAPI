const express = require("express");
const userController = require("../controllers/usersController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.post("/createUser", userController.createUser);
router.post("/loginUser", userController.loginUser);
router.get("/infoUser", verifyToken, userController.infoUser);

module.exports = router;
