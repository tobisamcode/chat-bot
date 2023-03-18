require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
};
