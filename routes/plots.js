const express = require("express");
const router = express.Router();

const {
  createPlot,
  updatePlotOrder,
  createDialogue,
  updateSituation,
} = require("./controllers/plots.controllers");

router.post("/new", createPlot);

router.patch("/order", updatePlotOrder);

router.post("/dialogue/new", createDialogue);

router.patch("/situation", updateSituation);

module.exports = router;
