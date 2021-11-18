const db = require("../db.js");

module.exports = class Chantier {
  async getAllChantiers(req, res, next) {
    const queryString = "SELECT * FROM chantier";

    try {
      const results = await db.query(queryString);
      if (results == "") {
        res.status(404).json({ message: "No result found" });
      } else {
        const chantiers = { chantiers: results };
        res.status(200).json(chantiers);
      }
    } catch (error) {
      next(error);
    }
  }

  async getOneChantier(req, res, next) {
    const queryString = `SELECT * FROM chantier WHERE id_chantier = ${req.params.id_chantier}`;

    try {
      const results = await db.query(queryString);
      if (results == "") {
        res.status(404).json({ message: "No result found" });
      } else {
        res.status(200).json(results[0]);
      }
    } catch (error) {
      next(error);
    }
  }

  async postChantier(req, res, next) {
    const queryString = `INSERT INTO chantier (id_chantier, coordonnees_lattitude_chantier, coordonnees_longitude_chantier, nom_chantier, date_de_debut_chantier, id_projet) VALUES (NULL, "${req.body.lattitude}", "${req.body.longitude}", "${req.body.nom}", "${req.body.date}", "${req.body.idProjet}")`;

    try {
      const results = await db.query(queryString);
      if (results == "") {
        res.status(404).json({ message: "Can't insert" });
      } else {
        res.status(200).json(results);
      }
    } catch (error) {
      next(error);
    }
  }
};
