const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/Users");
const Session = require("../models/Sessions");

const validation = (...args) => {
  return args.every((element) => element);
};

const isProduction = process.env.NODE_ENV === "production";

const authMe = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (!validation(mail, password)) {
      return res.status(400).json({ message: "フィールドが欠損しています" });
    }
    const user = await User.findUser(mail);
    if (!user) {
      return res.status(401).json({ message: "ユーザーが見つかりません" });
    }

    const isChecked = await bcrypt.compare(password, user.password_hash);
    if (!isChecked) {
      return res.status(401).json({ message: "パスワードが違います" });
    }

    const token = crypto.randomBytes(16).toString("hex");
    const expires_at = new Date(Date.now() + 1000 * 60 * 60); // 1000ms×60秒×60分で１時間の期限設定
    await Session.insSession({ token, user_id: user.id, expires_at });

    res.cookie("session_token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "Lax",
      expires: expires_at,
    });
    return res.status(200).json({ message: "ログインに成功しました", token });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    // DBのセッションを消す
    const token = req.cookies.session_token;
    if (!token) {
      return res.status(400).json({ message: "session_tokenが見つかりません" });
    }
    await Session.delSession(token);

    // クライアント側のクッキーを消す
    res.clearCookie("session_token", {
      httpOnly: true,
      secure: isProduction, // 本番環境ではtrue
      sameSite: "Lax",
    });
    return res.status(200).json({ message: "ログアウトしました" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const register = async (req, res) => {
  try {
    const { mail, password, name, address, lat, lon } = req.body;
    console.log(
      "🚀 ~ register ~ mail, password, name, address, lat, lon:",
      mail,
      password,
      name,
      address,
      lat,
      lon
    );
    if (!validation(mail, password, name, address, lat, lon)) {
      return res.status(400).json({ message: "フィールドが欠損しています" });
    }
    const exitUser = await User.findUser(mail);
    if (exitUser) {
      return res
        .status(400)
        .json({ message: "すでにユーザーが登録されています" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.createUser(
      mail,
      passwordHash,
      name,
      address,
      lat,
      lon
    );
    return res.status(201).json({
      message: "ユーザー登録に成功しました",
      newUserEmail: newUser[0].mail,
      newUserName: newUser[0].name,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { login, logout, register, authMe };
