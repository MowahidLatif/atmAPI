const express = require("express");
const userController = require("../controllers/usersController");
const router = express.Router();

router.get("/users", userController.getUsers());
router.post("/users", userController.createUser());

module.exports = router;