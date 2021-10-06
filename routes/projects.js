const express = require("express");
const router = express.Router();

const {
  getProjectList,
  createProject,
  deleteProject,
  getProject,
} = require("./controllers/projects.controllers");

const verifyToken = require("./middlewares/verifyToken");

router.get("/", getProjectList);

router.delete("/", verifyToken, deleteProject);

router.post("/new", verifyToken, createProject);

router.get("/:id", getProject);

module.exports = router;
