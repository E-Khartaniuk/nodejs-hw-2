const mongoose = require("mongoose");
const dotenv = require("dotenv");
//tjusAqpieKgLUkCE
const app = require("./app");

dotenv.config();

const { DB_HOST, PORT } = process.env;
// const DB_HOST =
//   "mongodb+srv://hartanyuk001:tjusAqpieKgLUkCE@cluster0.ucryriw.mongodb.net/my-contacts-db?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. Use our API on port: ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
