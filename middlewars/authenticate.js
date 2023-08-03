const HttpError = require("../helpers");
const ctrlWrapper = require("../decorators/ctrlWrapper.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
const { JWT_secret } = process.env;

async function authenticate(req, res, next) {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }

  try {
    const { id } = jwt.verify(token, JWT_secret);
    const user = await User.findById(id);

    if (!user || !user.token) {
      console.log("HE PA6OTAET");

      throw HttpError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401, error.message);
  }
}

module.exports = { authenticate: ctrlWrapper(authenticate) };
