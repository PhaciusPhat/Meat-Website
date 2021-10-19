const express = require("express");
const { authRouter } = require("./auths/auth-router");
const { cartRouter } = require("./carts/cart-router");
const { invoiceRouter } = require("./invoices/invoice-router");
const { productRouter } = require("./products/product-router");
const { productTypeRouter } = require("./productTypes/productType-router");
const { userRouter } = require("./users/user-router");
const { voucherRouter } = require("./vouchers/voucher-router");
const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/productType", productTypeRouter);
router.use("/product", productRouter);
router.use("/voucher", voucherRouter);
router.use("/cart", cartRouter);
router.use("/invoice", invoiceRouter);

module.exports = {
  router,
};
