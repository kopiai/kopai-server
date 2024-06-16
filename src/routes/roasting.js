const express = require("express");
const router = express.Router();
const RoastingController = require("../controllers/roastingController");

router.post("/roastings", RoastingController.createRoasting);

router.get("/roastings", RoastingController.getAllRoastings);

router.get("/roastings/:id", RoastingController.getRoastingById);

router.put("/roastings/:id", RoastingController.updateRoasting);

router.delete("/roastings/:id", RoastingController.deleteRoasting);

module.exports = router;
