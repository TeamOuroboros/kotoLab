const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const passport = require("passport");
require("./server/src/controllers/passport"); //passport.jsの設定の読み込み

const app = express();
const cookieParser = require("cookie-parser");

const authRouter = require("./server/src/routes/authRoutes");
const childrenRouter = require("./server/src/routes/childrenRoutes");
const logRouter = require("./server/src/routes/logRoutes");
const contactRouter = require("./server/src/routes/contactRoutes");
const weatherRouter = require("./server/src/routes/wetherRoutes");
const userRouter = require("./server/src/routes/userRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next();
// });

const isProduction = process.env.NODE_ENV === "production";

const session = require("express-session");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: isProduction, httpOnly: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/children", childrenRouter);
app.use("/api/log", logRouter);

app.use("/api/contact", contactRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/user", userRouter);

// dist 配信-----
app.use(express.static(path.join(__dirname, "/public")));
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/setting", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/suggetion", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/confirmchild", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/confirmparent", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
