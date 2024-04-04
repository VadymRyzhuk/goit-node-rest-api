import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.post(
  "/",
  upload.single("avatarURL"),
  contactsControllers.createContact
);

contactsRouter.put("/:id", isValidId, contactsControllers.updateContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactsControllers.updateStatusContact
);

export default contactsRouter;
