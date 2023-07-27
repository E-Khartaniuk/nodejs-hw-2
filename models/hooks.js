const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

const validateAtUpdate = function (next) {
  this.options.runValidator = true;
  next();
};

module.exports = { handleSaveError, validateAtUpdate };
