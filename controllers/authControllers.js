import jwt from "jsonwebtoken";
import fs from "fs/promises";
import gravatar from "gravatar";
import path from "path";
import Jimp from "jimp";
import { nanoid } from "nanoid";

import * as authServices from "../services/authServices.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import sendEmail from "../helpers/sendEmail.js";

const { JWT_SECRET, BASE_URL } = process.env;
const avatarsPath = path.resolve("public", "avatars");

import {
  userSignUpSchema,
  userSignInSchema,
  userEmailSchema,
} from "../schemas/usersSchemas.js";

const register = async (req, res) => {
  const { email } = req.body;
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email already use");
  }
  const { error } = userSignUpSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  //const newUser = await authServices.signup(req.body);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const body = { ...req.body, avatarURL, verificationToken };

  const newUser = await authServices.signup(body);

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click to verify</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await authServices.findUser({ verificationToken });
  if (!user) {
    throw HttpError(404, " User not found");
  }
  await authServices.updateUser(
    { _id: user.id },
    { verify: true, verificationToken: "" }
  );
  res.json({
    message: "Verification successful",
  });
};

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await authServices.findUser({ email });
  const { error } = userEmailSchema.validate(req.body);
  if (!user) {
    throw HttpError(400, "Email already verify");
  }
  if (user.verify) {
    throw HttpError(404, "Email not found");
  }
  if (error) {
    throw HttpError(400, error.message);
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" target="_blank">Click to verify</a>`,
  };

  await sendEmail(verifyEmail);
  res.json({
    message: "Verify email send success",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await authServices.findUser({ email });
  const { subscription } = user;
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const { error } = userSignInSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }
  const comparePassword = await authServices.validatePassword(
    password,
    user.password
  );
  if (!comparePassword) {
    throw HttpError(401, "Email or password invalid");
  }

  const { _id: id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await authServices.updateUser({ _id: id }, { token });

  res.json({ token, user: { email, subscription } });
};

const getCurrent = async (req, res) => {
  const { username, email } = req.user;
  res.json({
    username,
    email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });
  res.json({
    message: "Logout success",
  });
};

const avatarUpdate = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "File not uploaded");
  }

  const { _id } = req.user;

  const avatarImage = await Jimp.read(req.file.path);
  await avatarImage.resize(250, 250).write(req.file.path);

  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);

  await authServices.updateUser({ _id }, { avatarURL });

  res.status(200).json({
    avatarURL: avatarURL,
  });
};

export default {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerify: ctrlWrapper(resendVerify),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  avatarUpdate: ctrlWrapper(avatarUpdate),
};
