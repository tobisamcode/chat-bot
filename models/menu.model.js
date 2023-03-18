const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const MenuSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "name cannot be blank"],
      unique: true,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

MenuSchema.plugin(uniqueValidator);

MenuSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  const highestMenu = await this.constructor.findOne().sort("-id");
  if (!highestMenu) {
    this.id = 100;
  } else {
    this.id = highestMenu.id + 1;
  }

  return next();
});
const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;
