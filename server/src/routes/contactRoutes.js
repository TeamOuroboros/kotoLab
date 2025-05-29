const express = require('express');
const router = express.Router();
const { authenticate } = require('./authMiddleware');
const { contactGemini } = require('../controllers/contactController');

router.use(authenticate);
router.post('/', contactGemini);

module.exports = router;
