import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
  updateContactFavorite,
} from "../schemas/contactsSchemas.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactsServices.listContacts({ owner });
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  //const result = await contactsServices.getContactById(id);
  const result = await contactsServices.getOneMovie({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} NOT FOUND`);
  }

  res.json(result);
};

const createContact = async (req, res) => {
  const { error } = createContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { _id: owner } = req.user;
  const result = await contactsServices.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const { _id: owner } = req.user;
  //const result = await contactsServices.updateContactById(id, req.body);
  const result = await contactsServices.updateOneContact(
    { _id: id, owner },
    req.body
  );
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} NOT FOUND`);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  //const result = await contactsServices.removeContact(id);
  const result = await contactsServices.deleteOneContact({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} NOT FOUND`);
  }
  res.json({
    message: "Contact was successfully deleted!",
  });
};

const updateStatusContact = async (req, res) => {
  const { error } = updateContactFavorite.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { favorite } = req.body;

  //const result = await contactsServices.updateContactById(id, { favorite });
  const result = await contactsServices.updateStatusOfOneContact(
    { _id: id, owner },
    { favorite }
  );
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} NOT FOUND`);
  }
  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
