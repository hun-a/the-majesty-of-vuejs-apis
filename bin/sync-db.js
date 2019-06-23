const models = require("../data/models");

module.exports = () => models.sequelize.sync({ force: true });
