const express = require("express");
const router = express.Router();
const bootCampControlles = require("../controllers/bootcampControllers");

// route - /api/v1/bootcamps/
router
  .route("/")
  .get(bootCampControlles.getAllBootcamps)
  .post(bootCampControlles.createNewBootcamp);

// route - /api/v1/bootcamps/someID
router
  .route("/:id")
  .put(bootCampControlles.updateBootcampById)
  .delete(bootCampControlles.deleteBootcampById);

module.exports = router;
