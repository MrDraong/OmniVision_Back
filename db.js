const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);

async function query(sql, params) {
  try {
    sequelize.authenticate();
    console.log("Connecté à la BDD !");
  } catch (error) {
    console.error("Impossible de se connecter, erreur suivante :", error);
  }
  const [results] = await sequelize.query(sql, params);

  return results;
}

module.exports = {
  query,
};
