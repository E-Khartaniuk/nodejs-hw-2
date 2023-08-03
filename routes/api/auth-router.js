const express = require("express");
const {
  userSigninSchema,
  userSignupSchema,
} = require("../../schemas/usersSchemas.js");

const validateBody = require("../../decorators/validateBody.js");

const {
  signup,
  signin,
  getCurrnet,
  logout,
  subscriptionUpdate,
} = require("../../controllers/auth-controller,js");

const { authenticate } = require("../../middlewars/authenticate.js");

const authRouter = express.Router();

authRouter.post("/signup", validateBody(userSignupSchema), signup);
authRouter.post("/signin", validateBody(userSigninSchema), signin);
authRouter.get("/current", authenticate, getCurrnet);
authRouter.post("/logout", authenticate, logout);
authRouter.patch("/users/:contactId", authenticate, subscriptionUpdate);

module.exports = authRouter;
