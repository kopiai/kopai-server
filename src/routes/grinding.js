const express = require("express");
const router = express.Router();
const GrindingController = require("../controllers/grindingController");

router.post("/grindings", GrindingController.createGrinding);

router.get("/grindings", GrindingController.getAllGrindings);

router.get("/grindings/:id", GrindingController.getGrindingById);

router.put("/grindings/:id", GrindingController.updateGrinding);

router.delete("/grindings/:id", GrindingController.deleteGrinding);

module.exports = router;
