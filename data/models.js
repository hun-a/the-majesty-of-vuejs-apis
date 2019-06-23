const path = require("path");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "database.sqlite")
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
