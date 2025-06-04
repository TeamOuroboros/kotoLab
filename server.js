const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

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
app.use(cors());

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

// -------------

app.use("/api/auth", authRouter);
app.use("/api/children", childrenRouter);
app.use("/api/log", logRouter);

app.use("/api/children", childrenRouter);
app.use("/api/contact", contactRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/user", userRouter);

// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`);
// });

// const userController = require('./server/src/controllers/userscontroller');
// app.get('/api', userController.allGet);

module.exports = app;
