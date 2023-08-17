const numberRegex =
  /^[+]?d{2,}?[(]?d{2,}[)]?[-s.]?d{2,}?[-s.]?d{2,}[-s.]?d{0,9}$/im;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = { numberRegex, emailRegex };
