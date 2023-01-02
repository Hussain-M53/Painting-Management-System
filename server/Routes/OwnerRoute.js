const express = require("express");
const router = express.Router();
const Owner = require("../Controllers/Owner.js");

router.post("/", Owner.insert_owner);
router.get("/:id", Owner.retrieve_owner);
router.get("/", Owner.retrieve_owners);
router.put("/update", Owner.update_owner);
router.get("/returns/:id", Owner.retrieve_owners_return_report);

module.exports = router;