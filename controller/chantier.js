const db = require("../db.js");

module.exports = class Chantier {
  async getAllChantiers(req, res, next) {
    const queryString = "SELECT * FROM chantier";

    try {
      const results = await db.query(queryString);
      if (results == "") {
        res.status(404).json({ message: "No result found" });
      } else {
        res.status(200).json(results);
      }
    } catch (error) {
      next(error);
    }
  }
};
