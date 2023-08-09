const ctrlWrapper = require("../decorators/ctrlWrapper.js");
const HttpError = require("../helpers/HttpError.js");

const Jimp = require("jimp");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const dotenv = require("dotenv");
// const { use } = require("../routes/api/contacts.js");
dotenv.config();

const { JWT_secret } = process.env;

const posterPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, `email "${email}" in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  var avatarUrl = gravatar.url(email, { s: "200", r: "pg", d: "404" });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatarUrl,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    avatarURL: avatarUrl,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = await jwt.sign(payload, JWT_secret, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ token });
};

const getCurrnet = async (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (user.token === "") {
    throw HttpError(401, "Not authorized");
  }

  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "logout success" });
};

const subscriptionUpdate = async (req, res) => {
  console.log("heloooo");
  const { contactId } = req.user;
  const { subscription } = req.body;

  if (
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  ) {
    throw HttpError(401, "invalid subscription");
  }

  await User.findByIdAndUpdate(contactId, { subscription });
  res.json({ message: `subscription update to ${subscription}` });
};

const avatarsUpdate = async (req, res) => {
  const oldPath = req.file.path;
  const fileName = req.file.filename;
  const userId = req.user._id;
  const newPath = path.join(posterPath, fileName);

  try {
    const JIMPTImg = Jimp.read(oldPath)
      .then((avatar) => {
        return avatar.resize(250, 250).write(newPath);
      })
      .catch((err) => {
        console.error(err);
        throw HttpError(400, "img resize error");
      });
    console.log("JIMPTImg", JIMPTImg);

    await fs.rename(oldPath, newPath);
    await User.findByIdAndUpdate(userId, { avatarURL: newPath });

    res.status(200).json({ message: "Avatar updated successfully" });
  } catch (error) {
    console.error("Error while updating avatar:", error);
    res.status(500).json({ message: "Failed to update avatar" });
  }
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrnet: ctrlWrapper(getCurrnet),
  logout: ctrlWrapper(logout),
  subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
  avatarsUpdate: ctrlWrapper(avatarsUpdate),
};
