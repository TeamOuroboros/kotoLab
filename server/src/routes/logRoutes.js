const express = require("express");
const router = express.Router();
const {
  addParentLog,
  addChildLog,
  getChildLog,
  getParentState,
} = require("../controllers/logController");
const { authenticate } = require("./authMiddleware");

router.use(authenticate);
router.post("/parent", addParentLog);
router.post("/childstate", addChildLog);
router.get("/childstate", getChildLog);
router.get("/parent", getParentState);

module.exports = router;
