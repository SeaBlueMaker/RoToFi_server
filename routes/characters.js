const express = require("express");
const router = express.Router();

const {
  createCharacter,
  updateCharacter,
} = require("./controllers/characters.controllers");

router.patch("/", updateCharacter);

router.post("/new", createCharacter);

module.exports = router;
