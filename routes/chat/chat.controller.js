const CustomerModel = require("../../models/customer.model");

const date = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// render chat page
async function startChat(req, res, next) {
  try {
    const sessionId = req.session.id;
    const foundCustomer = await CustomerModel.find({ userId: sessionId });
    if (!foundCustomer.length > 0) {
      const newCustomer = await CustomerModel.create({
        userId: sessionId,
      });
    }
    res.render("index", { date });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  startChat,
};
