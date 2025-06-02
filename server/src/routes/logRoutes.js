const express = require("express");
const router = express.Router();
const { addParentLog, addChildLog } = require("../controllers/logController");
const { authenticate } = require("./authMiddleware");

router.use(authenticate);
router.post("/parent", addParentLog);
router.post("/childstate", addChildLog);

module.exports = router;
