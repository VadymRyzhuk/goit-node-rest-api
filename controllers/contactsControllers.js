// import * as contactsServices from "../services/contactsServices.js";
// import HttpError from "../helpers/HttpError.js";
// import {
//   createContactSchema,
//   updateContactSchema,
// } from "../schemas/contactsSchemas.js";

// import ctrlWrapper from "../decorators/ctrlWrapper.js";

// export const getAllContacts = async (req, res) => {
//   const result = await contactsServices.listContacts();
//   res.json(result);
// };

// export const getOneContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsServices.getContactById(id);
//   if (!result) {
//     throw HttpError(404, `Contact with id = ${id} NOT FOUND`);
//   }
//   res.json(result);
// };

// export const createContact = async (req, res) => {
//   const { error } = createContactSchema.validate(req.body);
//   if (error) {
//     throw HttpError(400, error.message);
//   }
//   const result = await contactsServices.addContact(req.body);
//   res.status(201).json(result);
// };

// export const updateContact = async (req, res) => {
//   const { error } = updateContactSchema.validate(req.body);
//   if (error) {
//     throw HttpError(400, error.message);
//   }
//   const { id } = req.params;
//   const result = await contactsServices.updateContactById(id, req.body);
//   if (!result) {
//     throw HttpError(404, `Contact with id = ${id} NOT FOUND`);
//   }
//   res.json(result);
// };

// export const deleteContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsServices.removeContact(id);
//   if (!result) {
//     throw HttpError(404, `Contact with id = ${id} NOT FOUND`);
//   }
//   res.json({
//     message: "Contact was successfully deleted!",
//   });
// };

// export default {
//   getAllContacts: ctrlWrapper(getAllContacts),
//   getOneContact: ctrlWrapper(getOneContact),
//   createContact: ctrlWrapper(createContact),
//   updateContact: ctrlWrapper(updateContact),
//   deleteContact: ctrlWrapper(deleteContact),
// };

import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const result = await contactsServices.listContacts();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.getContactById(id);
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
  const result = await contactsServices.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await contactsServices.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} NOT FOUND`);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} NOT FOUND`);
  }
  res.json({
    message: "Contact was successfully deleted!",
  });
};

const updateStatusContact = async (req, res) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const { favorite } = req.body;

  const result = await contactsServices.updateContactById(id, { favorite });
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
