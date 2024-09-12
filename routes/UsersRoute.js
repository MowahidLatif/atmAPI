const express = require("express");
const userController = require("../controllers/usersController");
const router = express.Router();

// router.get("/", userController.getUsers);
router.post("/", userController.createUser);

module.exports = router;
