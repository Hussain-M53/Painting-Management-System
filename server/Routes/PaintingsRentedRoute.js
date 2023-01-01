const express = require("express");
const router = express.Router();
const Paintings_Rented = require("../Controllers/Paintings_Rented.js");

router.post("/", Paintings_Rented.insert_paintings_rented);
router.get("/", Paintings_Rented.retrieve_paintings_rented);
router.post("/return");
router.get("/CustomerHirings/:id", Paintings_Rented.retrieve_rental_report);
router.put("/CustomerHirings/update/:id", Paintings_Rented.return_paintings_rented);


module.exports = router;