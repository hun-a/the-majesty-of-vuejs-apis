const R = require("ramda");
const models = require("../data/models");

const getAll = (req, res, next) =>
  models.Stories.findAll({
    attributes: ["id", "plot", "upvotes", "writer"]
  })
    .then(result => res.json(result))
    .catch(next);

module.exports = {
  getAll
};
