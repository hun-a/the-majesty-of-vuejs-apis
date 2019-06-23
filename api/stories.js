const R = require("ramda");
const { Stories } = require("../data/models");

const getAll = (req, res, next) =>
  Stories.findAll({
    attributes: ["id", "plot", "upvotes", "writer"]
  })
    .then(result => res.json(result))
    .catch(next);

const getById = (req, res, next) => {
  const { params: { id } } = req;
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

const create = (req, res, next) => {
  const { body } = req;
  if (R.either(R.isEmpty, R.isNil)(body)) {
    return next("Invalid body");
  }

  Stories.create(body)
    .then(result => res.status(201).json(result))
    .catch(next);
};

const update = (req, res, next) => {
  const { params: { id }, body } = req;
  if (!id) {
    return next("Id is required.");
  }
  if (R.either(R.isEmpty, R.isNil)(body)) {
    return next("Invalid body");
  }

  Stories.update(body, { where: { id } })
    .then(result => res.json(result))
    .catch(next);
};

const destroy = (req, res, next) => {
  const { params: { id } } = req;
  if (!id) {
    return next("Id is required.");
  }

  Stories.destroy({
    where: { id }
  })
    .then(result => res.json(result))
    .catch(next);
};

module.exports = {
  getAll, getById, create, update, destroy
};
