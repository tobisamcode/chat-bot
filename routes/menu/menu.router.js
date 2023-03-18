const express = require("express");

const menuController = require("./menu.controller");

const menu = express.Router();

menu.get("/", menuController.getMenuItems);

menu.post("/", menuController.addMenuItem);

module.exports = menu;
