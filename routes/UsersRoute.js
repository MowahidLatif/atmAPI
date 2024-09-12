const express = require("express");
const userController = require("../controllers/usersController");
const router = express.Router();

router.post("/", userController.createUser);
router.post("/loginUser", userController.loginUser);

module.exports = router;
