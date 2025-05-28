const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const userController = require('./server/src/controller/users.controller');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

app.get('/api', userController.allGet);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
