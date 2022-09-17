const express = require("express");
const {
  getAllCanidaes,
  createCanidae,
  getSingleCanidae,
  updateCanidae,
  deleteCanidae,
} = require("../../controllers/animalia/canidaeController");
const router = express.Router();

router.route("/").get(getAllCanidaes).post(createCanidae);
router
  .route("/:id")
  .get(getSingleCanidae)
  .patch(updateCanidae)
  .delete(deleteCanidae);

module.exports = router;
