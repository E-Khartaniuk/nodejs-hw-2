const handleSaveError = (error, data, next) => {
  const { name, code } = error;
  error.status = code === 11000 && name === "MangoServerError" ? 400 : 409;
  next();
};

const validateAtUpdate = function (next) {
  this.options.runValidator = true;
  next();
};

module.exports = { handleSaveError, validateAtUpdate };
