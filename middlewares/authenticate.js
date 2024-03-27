import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;
import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/authServices.js";

const authenticate = async (req, _, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authorization header NOT found"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer  NOT found"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await findUser({ _id: id }); // {_id: id} ????????

    if (!user) {
      return next(HttpError(401, "User  NOT found"));
    }
    if (!user.token) {
      {
        return next(HttpError(401, "User already logout!"));
      }
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
