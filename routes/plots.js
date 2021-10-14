const express = require("express");
const router = express.Router();

const {
  createPlot,
  deletePlot,
  updatePlotOrder,
  createDialogue,
  updateSituation,
  updateLocation,
} = require("./controllers/plots.controllers");

router.delete("/", deletePlot);

router.post("/new", createPlot);

router.patch("/order", updatePlotOrder);

router.post("/dialogue/new", createDialogue);

router.patch("/situation", updateSituation);

router.patch("/location", updateLocation);

module.exports = router;
