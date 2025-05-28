const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

const authRouter = require('./server/src/routes/authRoutes');

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);

	// const userController = require('./server/src/controllers/users.controller');
	// app.get('/api', userController.allGet);
});
