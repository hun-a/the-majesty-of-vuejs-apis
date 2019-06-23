const express = require("express");
const router = express.Router();
const stories = require("./stories");

router
  .route("/stories")
  .get(stories.getAll)
  .post(stories.create);

router
  .route("/stories/:id")
  .get(stories.getById)
  .put(stories.update)
  .delete(stories.destroy);


module.exports = router;
