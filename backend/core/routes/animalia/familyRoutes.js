const express = require("express");
const {
  authenticateUser,
  authorizePermissions,
} = require("../../../configs/middleware/authentication");
const {
  createFamily,
  getAllFamilies,
  getSingleFamily,
  updateFamily,
  deleteFamily,
} = require("../../controllers/animalia/familyController");
const router = express.Router();

router
  .route("/")
  .get(getAllFamilies)
  .post(authenticateUser, authorizePermissions("admin", "staff"), createFamily);

router
  .route("/:id")
  .get(getSingleFamily)
  .patch(authenticateUser, authorizePermissions("admin", "staff"), updateFamily)
  .delete(
    authenticateUser,
    authorizePermissions("admin", "staff"),
    deleteFamily
  );

module.exports = router;
