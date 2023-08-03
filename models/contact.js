const { Schema, model } = require("mongoose");
const { numberRegex, emailRegex } = require("../constantse/phoneNumber");
const { handleSaveError, validateAtUpdate } = require("./hooks");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    // match: emailRegex,
    required: true,
  },
  phone: {
    type: String,
    // match: numberRegex,
    required: [true, "Set phone for contact"],
  },
  favorite: { type: Boolean, default: false },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

contactSchema.pre("findOneAndUpdate", validateAtUpdate);
contactSchema.post("save", handleSaveError);
contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = new model("conatct", contactSchema);

module.exports = Contact;
