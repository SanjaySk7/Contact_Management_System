const express = require("express");
const { createEvent,getAllContacts,deleteContact,updateContact } = require("../controllers/eventController");

const router = express.Router();

router.post("/contacts", createEvent);
router.get("/contacts", getAllContacts);
router.delete("/contacts:id", deleteContact);
router.put("/contacts:id", updateContact);


module.exports = router;
