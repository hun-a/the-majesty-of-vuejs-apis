const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false
});

const Stories = sequelize.define("stories", {
  plot: Sequelize.STRING,
  upvotes: Sequelize.INTEGER,
  writer: Sequelize.STRING
});

module.exports = {
  Sequelize,
  sequelize,
  Stories
};
