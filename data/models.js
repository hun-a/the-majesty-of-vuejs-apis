const path = require("path");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "database.sqlite"),
  logging: false
});

const Stories = sequelize.define("Stories", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  plot: Sequelize.STRING,
  upvotes: Sequelize.INTEGER,
  writer: Sequelize.STRING
});

const Movies = sequelize.define("Movies", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  director: Sequelize.STRING
})

module.exports = {
  Sequelize,
  sequelize,
  Stories,
  Movies
};
