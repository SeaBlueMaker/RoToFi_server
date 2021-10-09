const express = require("express");
const router = express.Router();

const {
  createPlot,
  updatePlotOrder,
  createDialogue,
} = require("./controllers/plots.controllers");

router.post("/new", createPlot);

router.patch("/order", updatePlotOrder);

router.post("/dialogue/new", createDialogue);

module.exports = router;
