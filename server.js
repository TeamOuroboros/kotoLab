const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

const authRouter = require('./server/src/routes/authRoutes');
const childrenRouter = require('./server/src/routes/childrenRoutes');
const logRouter = require('./server/src/routes/logRoutes');
const contactRouter = require('./server/src/routes/contactRoutes');

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/children', childrenRouter);
app.use('/api/log', logRouter);

app.use('/api/children',childrenRouter);
app.use('/api/contact',contactRouter)
// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`);
// });

// const userController = require('./server/src/controllers/userscontroller');
// app.get('/api', userController.allGet);

module.exports = app;
