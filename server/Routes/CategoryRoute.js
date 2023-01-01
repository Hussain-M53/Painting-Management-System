const express = require("express");
const router = express.Router();
const Category = require("../Controllers/Category.js");


router.post("/", Category.insert_category);
router.get("/", Category.retrieve_category);

module.exports = router;