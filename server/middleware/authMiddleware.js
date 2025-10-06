import jwt from "jsonwebtoken";
import { httpError } from "../utils/httpErrorHelper.js";

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    req.token = null;
  }

  next();
};

const userIdExtractor = (req, res, next) => {
  const token = req.token;

  if (!token) {
    httpError("Token missing", 401);
  }

  const decodetToken = jwt.verify(token, process.env.SECRET);

  req.userId = decodetToken.id;
  next();
};

export { tokenExtractor, userIdExtractor };
