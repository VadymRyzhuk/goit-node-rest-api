import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", updateContact);

contactsRouter.delete("/:id", deleteContact);

export default contactsRouter;
