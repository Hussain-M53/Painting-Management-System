const express = require("express");
const router = express.Router();
const Customer = require("../Controllers/Customer.js");

router.post("/", Customer.insert_customer);
router.get("/", Customer.retrieve_customers);
router.get("/:id", Customer.retrieve_customer);
router.put("/update", Customer.update_customer);


module.exports = router;

