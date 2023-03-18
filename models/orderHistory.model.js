const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const CustomerOrderHistorySchema = new Schema({
  customerId: {
    type: String,
    ref: "Customer",
    localField: "customerId",
    foreignField: "userId",
  },
  orders: [
    [
      {
        id: Number,
        name: String,
        price: String,
        orderDate: String,
      },
    ],
  ],
  date: {
    type: String,
    default: () => moment().format("LLLL"),
  },
});

const History = mongoose.model("History", CustomerOrderHistorySchema);

module.exports = History;
