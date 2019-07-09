const express = require("express");
const router = express.Router();
const stories = require("./stories");
const movies = require("./movies");
const exchage = require("./exchange");

router
  .route("/stories")
  .get(stories.getAll)
  .post(stories.create);

router
  .route("/stories/:id")
  .get(stories.getById)
  .put(stories.update)
  .delete(stories.destroy);

router
  .route("/movies")
  .get(movies.getAll)
  .post(movies.create);

router
  .route("/movies/:id")
  .get(movies.getById)
  .put(movies.update)
  .delete(movies.destroy);

router.get("/exchange/:monetary", exchage.index);

module.exports = router;
