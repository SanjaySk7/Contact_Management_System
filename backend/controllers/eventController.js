const DataModel = require("../models/DataModels");

const createEvent = async (req, res) => {
  try {
    const existingContact = await DataModel.findOne({ phoneNumber: req.body.phoneNumber });
    if (existingContact) {
      return res.status(400).json({ error: "Contact already exists with this phone number" });
    }

    const newData = new DataModel(req.body);
    const savedData = await newData.save();

    res.status(201).json(savedData);
  } catch (err) {
    console.error("Error saving data:", err.message); 
    console.error(err.stack); 
    res.status(500).json({ error: "Error saving data", details: err.message });
  }
};


const getAllContacts = async (req, res) => {
  try {
    const contacts = await DataModel.find();
    res.status(200).json(contacts); 
  } catch (err) {
    console.error("Error fetching contacts:", err.message);
    res.status(500).json({ error: "Error fetching contacts" });
  }
};

const deleteContact = async (req, res) => {
  console.log("Deleting contact with ID:", req.params.id);
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "No ID provided" });
    }

    const result = await DataModel.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    res.status(500).json({ error: "Error deleting contact" });
  }
};


const updateContact = async (req, res) => {
  try {
    const updatedContact = await DataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error.message);
    res.status(500).json({ error: "Error updating contact" });
  }
};

module.exports = { createEvent,getAllContacts,deleteContact,updateContact};
