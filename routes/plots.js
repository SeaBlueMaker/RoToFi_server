const express = require("express");
const router = express.Router();

const {
  createPlot,
  updatePlotOrder,
} = require("./controllers/plots.controllers");

router.post("/new", createPlot);

router.patch("/order", updatePlotOrder);

module.exports = router;
