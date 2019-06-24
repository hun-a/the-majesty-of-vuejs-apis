const R = require("ramda");
const { Stories } = require("../data/models");

const getAll = (req, res, next) => {
  if (req.query.page) {
    const current_page = Number(req.query.page);
    const per_page = Number(req.query.per_page) || 15;
    const from = (current_page - 1) * per_page + 1;
    const to = from + per_page - 1;

    Stories.count()
      .then(total => {
        const last_page = Math.ceil(total / per_page);
        const next_page_url = current_page < last_page ? current_page + 1 : null;
        const prev_page_url = current_page == 1 ? null : current_page - 1

        return Stories.findAll({
            attributes: ["id", "plot", "upvotes", "writer"],
            offset: from,
            limit: per_page
          })
            .then(data => res.json({
              total,
              per_page,
              current_page,
              last_page,
              next_page_url,
              prev_page_url,
              from,
              to,
              data
            }))
            .catch(next);
      })
      .catch(next);
  } else {
    Stories.findAll({
      attributes: ["id", "plot", "upvotes", "writer"]
    })
      .then(data => res.json(data))
      .catch(next);
  }
};

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
