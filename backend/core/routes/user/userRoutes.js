const express = require("express");
const {
  authenticateUser,
  authorizePermissions,
} = require("../../../configs/middleware/authentication");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  profileImageUser,
} = require("../../controllers/users/userControllers");
const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/showProfile").get(authenticateUser, showCurrentUser);

router.route("/updateUser").patch(authenticateUser, updateUser);

router.route("/updatePassword").patch(authenticateUser, updateUserPassword);
router.route("/uploadImage").patch(authenticateUser, profileImageUser);

router
  .route("/:id")
  .get(authenticateUser, getSingleUser)
  .delete(authenticateUser, deleteUser);

module.exports = router;
