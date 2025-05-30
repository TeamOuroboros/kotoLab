const express = require('express');
const router = express.Router();
const { addParentLog, addChildLog } = require('../controllers/logController');

router.post('/parent', addParentLog);
router.post('/childstate', addChildLog);

module.exports = router;
