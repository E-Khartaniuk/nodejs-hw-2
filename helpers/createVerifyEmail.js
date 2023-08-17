const { BASE_URL } = process.env;

const createVerifyEmail = ({ email, verificationToken }) => {
  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a href="${BASE_URL}/api/auth/users/verify/${verificationToken}" target="_blank">Click to verify email</a>`,
  };

  return verifyEmail;
};

module.exports = createVerifyEmail;
