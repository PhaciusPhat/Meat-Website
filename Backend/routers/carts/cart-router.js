const express = require("express");
const {
  getCartList,
  addProductIntoCart,
  deleteProductInCart,
} = require("../../controllers/cart-controller");
const { authenticate } = require("../../middlewares/auth/verifyToken-middleware");
const cartRouter = express.Router();

cartRouter.get("/", authenticate, getCartList);
cartRouter.post("/", authenticate, addProductIntoCart);
cartRouter.delete("/", authenticate, deleteProductInCart);

module.exports = {
  cartRouter,
};
