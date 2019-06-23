const R = require("ramda");
const { Stories } = require("../data/models");

const getAll = (req, res, next) =>
  Stories.findAll({
    attributes: ["id", "plot", "upvotes", "writer"]
  })
    .then(result => res.json(result))
    .catch(next);

const getById = (req, res, next) => {
  const {id} = req.params;
  if (!id) {
    return next("Id is required.");
  }

  Stories.findOne({
    where: { id },
    attributes: ["id", "plot", "upvotes", "writer"]
  })
    .then(result => res.json(result))
    .catch(next);
};

module.exports = {
  getAll, getById
};
