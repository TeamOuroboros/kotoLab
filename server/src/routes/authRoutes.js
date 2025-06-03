const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  register,
  authMe,
  google,
  googleCallback,
} = require("../controllers/authController");
const { authenticate } = require("./authMiddleware");

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.get("/google", google);
router.get("/google/callback", googleCallback);
router.get("/me", authenticate, authMe);

module.exports = router;
