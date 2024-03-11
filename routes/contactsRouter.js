import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.post("/", contactsControllers.createContact);

contactsRouter.put("/:id", isValidId, contactsControllers.updateContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactsControllers.updateStatusContact
);

export default contactsRouter;
