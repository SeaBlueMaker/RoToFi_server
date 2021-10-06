const express = require("express");
const router = express.Router();

const { createCharacter } = require("./controllers/characters.controllers");

router.post("/new", createCharacter);

module.exports = router;
