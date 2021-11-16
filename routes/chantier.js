const express = require("express");
const router = express.Router();

//const auth = require('../middleware/auth');
const Chantier = require("../controllers/chantier.js");
const chantier = new Chantier();

//ajouter auth après les entrypoints pour utiliser l'authentification
router.get("/", chantier.getAllChantiers);

module.exports = router;
