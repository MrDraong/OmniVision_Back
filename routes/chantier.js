const express = require("express");
const router = express.Router();

//const auth = require('../middleware/auth');
const chantierCtrl = require("../controllers/chantier.js");

//ajouter auth après les entrypoints pour utiliser l'authentification
router.get("/", chantierCtrl.getAllChantiers);

module.exports = router;
