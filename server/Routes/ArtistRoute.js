const express = require("express");
const router = express.Router();
const Artist = require("../Controllers/Artist.js");

router.post("/", Artist.insert_artist);
router.get("/:id", Artist.retrieve_artist);
router.get("/", Artist.retrieve_artists);
router.put("/update", Artist.update_artist);
router.get("/paintings/get/:id", Artist.retrieve_artist_paintings_report);


module.exports = router;