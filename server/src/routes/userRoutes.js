const express = require("express");
const router = express.Router();
const { allGet, userGet } = require("../controllers/usersController");

router.get("/", allGet);
router.get("/:id", userGet);

module.exports = router;
