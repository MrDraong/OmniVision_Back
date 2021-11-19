const db = require("../db.js");

module.exports = class Chantier {
  async getAllChantiers(req, res, next) {
    const queryStringChantier = "SELECT * FROM chantier";

    try {
      const results = await db.query(queryStringChantier);
      if (results == "") {
        return res.status(404).json({ message: "No result found" });
      } else {
        for (const chantier of results) {
          const queryStringLastIncident = `SELECT * FROM v_capture_incident WHERE id_chantier = ${chantier.id_chantier} ORDER BY date_capture LIMIT 1`;
          const incident = await db.query(queryStringLastIncident);
          chantier.incident = incident;
        }
        const chantiers = { chantiers: results };
        return res.status(200).json(chantiers);
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
        return res.status(404).json({ message: "No result found" });
      } else {
        const queryStringLastIncident = `SELECT * FROM v_capture_incident WHERE id_chantier = ${req.params.id_chantier}`;
        const incidents = await db.query(queryStringLastIncident);
        results[0].incident = incidents;
        return res.status(200).json(results[0]);
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
        return res.status(404).json({ message: "Can't insert" });
      } else {
        return res.status(200).json(results);
      }
    } catch (error) {
      next(error);
    }
  }

  async getIncident(req, res, next) {
    const queryString = `SELECT * FROM v_chantier_incidents WHERE id_chantier = ${req.params.id_chantier} ORDER BY date_capture LIMIT 1`;

    try {
      const results = await db.query(queryString);
      if (results == "") {
        return res.status(404).json({ message: "No result found" });
      } else {
        return res.status(200).json(results[0]);
      }
    } catch (error) {
      next(error);
    }
  }
};
