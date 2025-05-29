const express = require('express');
const router = express.Router();
const { authenticate } = require('./authMiddleware');
const {
  createLog,
  getLog,
  contactGemini,
} = require('../controllers/contactController');

router.use(authenticate);
router.post('/log', createLog);
router.get('/log', getLog);
router.post('/', contactGemini);

module.exports = router;
