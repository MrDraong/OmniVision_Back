const express = require("express");
const router = express.Router();

//const auth = require('../middleware/auth');
const Chantier = require("../controller/chantierCtrl");
const chantier = new Chantier();

//ajouter auth après les entrypoints pour utiliser l'authentification
router.get("/", chantier.getAllChantiers);
router.get("/:id_chantier", chantier.getOneChantier);
router.post("/", chantier.postChantier);

module.exports = router;
