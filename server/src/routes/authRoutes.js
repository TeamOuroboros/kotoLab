const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const express = require("express");
const passport = require("passport");
require("./../controllers/passport"); //passport.jsの設定の読み込み
const crypto = require("crypto");
const Session = require("../models/Sessions");

const isProduction = process.env.NODE_ENV === "production";

const router = express.Router();
const {
  login,
  logout,
  register,
  authMe,
} = require("../controllers/authController");
const { authenticate } = require("./authMiddleware");

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);

router.get("/google", (req, res, next) => {
  console.log("/api/auth/googleにアクセスされました");

  passport.authenticate("google", {
    scope: ["email", "profile"],
  })(req, res, next);
});

const frontUrl = process.env.FRONT_URL || "/";
router.get(
  "/google/callback",
  (req, res, next) => {
    console.log("callbackルートに来た");
    next();
  },
  passport.authenticate("google", {
    failureRedirect: frontUrl, //認証失敗後、ここにリダイレクト
  }),
  async (req, res) => {
    // console.log("🚀 ~ req:", req.user);
    //セッショントークンをsessionsに入れる
    const token = crypto.randomBytes(16).toString("hex");
    const expires_at = new Date(Date.now() + 1000 * 60 * 60); // 1000ms×60秒×60分で１時間の期限設定
    await Session.insSession({ token, user_id: req.user.id, expires_at });
    res.cookie("session_token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "Lax",
      expires: expires_at,
    });

    res.redirect(`${frontUrl}register/children`);
  }
);

router.get("/me", authenticate, authMe);

module.exports = router;
