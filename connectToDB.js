const mongoose = require("mongoose");
const CONFIG = require("./config");

function connectToDB() {
  mongoose.connect(CONFIG.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB Successfully");
  });
}

module.exports = connectToDB;
