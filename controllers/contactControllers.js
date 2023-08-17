const HttpError = require("../helpers");
const isValidId = require("../middlewars/isValidId");
const Contact = require("../models/contact");
const {
  contactUpdateFavoriteSchema,
  contactsAddSchema,
} = require("../schemas/contactsAddSchema");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = false } = req.query;
  const filter = { owner };

  if (favorite === "true") {
    filter.favorite = true;
  }
  console.log(filter);
  const skip = (page - 1) * limit;
  try {
    const results = await Contact.find(filter, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "name email");

    res.json(results);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    isValidId;
    const results = await Contact.findById(contactId);
    if (!results) {
      console.log(HttpError);
      throw HttpError(404, `Not found`);
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { _id: owner } = req.user;

    const results = await Contact.create({ ...req.body, owner });
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const results = await Contact.findByIdAndDelete(contactId);
    if (!results) {
      throw HttpError(404, `Contact with ID="${contactId} not found"`);
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const changeById = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    console.log(contactId);
    const results = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!results) {
      console.log(HttpError);
      throw HttpError(404, `Not found`);
    }

    res.json(results);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    // console.log(contactId);
    const results = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!results) {
      console.log(HttpError);
      throw HttpError(404, "missing field favorite");
    }

    res.json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  changeById,
  updateFavorite,
};
