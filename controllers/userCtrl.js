const db = require("../db.js");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = {
      pseudo: req.body.pseudo,
      password: hash,
    };

    const queryString = `INSERT INTO utilisateur (id_utilisateur, identifiant_utilisateur, nom_utilisateur, prenom_utilisateur, date_creation_utilisateur, bloque_utilisateur, mdp_hash_utilisateur, id_equipe) VALUES (NULL, "${user.pseudo}", "${req.body.nom_utilisateur}", "${req.body.prenom_utilisateur}", "${req.body.date}", "${req.body.bloque}", "${user.password}", "${req.body.idEquipe}")`;
    db.query(queryString)
      .then(() => {
        res.status(201).json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

exports.login = async (req, res, next) => {
  const queryString = `SELECT * FROM USER WHERE identifiant_utilisateur = "${req.body.pseudo}""`;
  db.query(queryString)
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "User not found!",
        });
      }
      bcrypt
        .compare(req.body.password, user.mdp_hash_utilisateur)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: "Incorrect password!",
            });
          }
          const token = "test"; /*jwt.sign(
            { userId: user.id_utilisateur },
            "RANDOM_TOKEN_SECRET",
            {
              expiresIn: "24h",
            }
          );*/
          res.status(200).json({
            userId: user.id_utilisateur,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
