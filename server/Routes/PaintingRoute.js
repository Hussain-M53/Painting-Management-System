const express = require("express");
const router = express.Router();
const Painting = require("../Controllers/Painting.js");


router.post("/", Painting.insert_painting);
router.get("/:id", Painting.retrieve_painting);
router.get("/", Painting.retrieve_paintings);
router.put("/update", Painting.update_painting);


module.exports = router;