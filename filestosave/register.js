const express = require("express");
const router = express.Router();
const registerController = require("../config/controllers/registerController");

router.post("/", registerController.handleNewUser);

module.exports = router;
