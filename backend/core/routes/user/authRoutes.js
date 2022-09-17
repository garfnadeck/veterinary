const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  logoutController,
} = require("../../controllers/users/authController");

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").post(logoutController);

module.exports = router;
