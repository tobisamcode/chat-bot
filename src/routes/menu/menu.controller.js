const MenuModel = require("../../models/menu.model");

// add a new menu item to the database
async function addMenuItem(req, res, next) {
  try {
    const item = req.body;
    console.log(item);

    const addedItem = await MenuModel.create(item);

    res.status(201).json({
      status: true,
      message: "added new item successfully",
      addedItem,
    });
  } catch (error) {
    next(error);
  }
}

// get all menu items
async function getMenuItems(req, res, next) {
  try {
    const menu = await MenuModel.find({});

    res.status(200).json({
      status: true,
      message: "loaded menu successfully",
      menu,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addMenuItem,
  getMenuItems,
};
