const express = require("express");
const router = express.Router();

const {
  getProjectList,
  createProject,
  deleteProject,
} = require("./controllers/projects.controllers");

const verifyToken = require("./middlewares/verifyToken");

router.get("/", getProjectList);

router.delete("/", verifyToken, deleteProject);

router.post("/new", verifyToken, createProject);

module.exports = router;
