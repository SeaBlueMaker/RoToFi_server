const express = require("express");
const router = express.Router();

const {
  getProjectList,
  createProject,
} = require("./controllers/projects.controllers");

const verifyToken = require("./middlewares/verifyToken");

router.get("/", getProjectList);

router.post("/new", verifyToken, createProject);

module.exports = router;
