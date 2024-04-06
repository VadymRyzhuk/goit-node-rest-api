import express from "express";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", upload.single("avatar"), authControllers.register);

authRouter.get("/verify/:verificationToken", authControllers.verify);

authRouter.post("/verify", authControllers.resendVerify);

authRouter.post("/login", authControllers.login);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.avatarUpdate
);

export default authRouter;
