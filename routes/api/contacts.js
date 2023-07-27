const express = require("express");

const router = express.Router();

const {
  getAll,
  getById,
  addContact,
  deleteContact,
  changeById,
  updateFavorite,
} = require("../../controllers/contactControllers.js");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeById);

router.patch("/:contactId/favorite", updateFavorite);

module.exports = router;
