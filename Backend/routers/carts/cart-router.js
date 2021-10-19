const express = require("express");
const {
  getCartList,
  addProductIntoCart,
  deleteProductInCart,
} = require("../../controllers/cart-controller");
const cartRouter = express.Router();

cartRouter.get("/", getCartList);
cartRouter.post("/", addProductIntoCart);
cartRouter.delete("/", deleteProductInCart);

module.exports = {
  cartRouter,
};
