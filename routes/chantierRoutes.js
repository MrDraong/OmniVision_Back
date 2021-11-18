const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

//const auth = require('../middleware/auth');
const Chantier = require("../controllers/chantierCtrl");
const chantier = new Chantier();

router.get("/", chantier.getAllChantiers);
router.get("/:id_chantier", chantier.getOneChantier);
router.get("/incident/:id_chantier", chantier.getIncident);
router.post("/", chantier.postChantier);

module.exports = router;
