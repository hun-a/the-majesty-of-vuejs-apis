const express = require("express");
const router = express.Router();
const stories = require("./stories");

router.get("/stories", stories.getAll);

module.exports = router;
