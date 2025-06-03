const path = require("path");
const express = require("express");
const cors = require("cors");
const passport = require("passport");

const app = express();
const cookieParser = require("cookie-parser");

const authRouter = require("./server/src/routes/authRoutes");
const childrenRouter = require("./server/src/routes/childrenRoutes");
const logRouter = require("./server/src/routes/logRoutes");
const contactRouter = require("./server/src/routes/contactRoutes");
const weatherRouter = require("./server/src/routes/wetherRoutes");

app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());
app.use(cors());

const session = require("express-session");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/children", childrenRouter);
app.use("/api/log", logRouter);

app.use("/api/children", childrenRouter);
app.use("/api/contact", contactRouter);
app.use("/api/weather", weatherRouter);

// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`);
// });

// const userController = require('./server/src/controllers/userscontroller');
// app.get('/api', userController.allGet);

module.exports = app;
