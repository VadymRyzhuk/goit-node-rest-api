import Contact from "../models/Contact.js";

export const listContacts = (filter = {}) => Contact.find(filter);

export const addContact = (data) => Contact.create(data);

export const getContactById = (id) => Contact.findById(id);

export const getOneContact = (filter) => Contact.findOne(filter);

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const updateOneContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, { new: true, runValidators: true });

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const deleteOneContact = (filter) => Contact.findOneAndDelete(filter);

export const updateStatusContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const updateStatusOfOneContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, { new: true, runValidators: true });
