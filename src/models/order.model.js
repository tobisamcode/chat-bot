const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  id: ObjectId,
  orderedItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
  },

  orderedBy: {
    type: String,
    ref: "Customer",
    localField: "orderedBy",
    foreignField: "userId",
  },
  orderedAT: {
    type: String,
    default: () => moment().format("LLLL"),
  },
});

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = Orders;
