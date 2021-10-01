const express = require("express");
const router = express.Router();

const {
  verifyUserData,
  registerUser,
  logout,
} = require("./controllers/users.controllers");

router.post("/check-member", verifyUserData);

router.post("/register", registerUser);

router.get("/logout", logout);

module.exports = router;
