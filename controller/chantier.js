const db = require("../db");

exports.getAllChantiers = (req, res, next) => {
  db.query("SELECT * FROM chantier")
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
