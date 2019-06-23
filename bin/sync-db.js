const models = require("../data/models");

module.exports = () => models.sequelize.sync({
  force: process.env.NODE_ENV === "test" ? true : false
});
