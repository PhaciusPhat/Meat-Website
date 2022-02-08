const express = require("express");
// const { changePass } = require("../controllers/user-controller");
const { authRouter } = require("./auth-router");
const { cartRouter } = require("./cart-router");
const { invoiceRouter } = require("./invoice-router");
const { productRouter } = require("./product-router");
const { productTypeRouter } = require("./productType-router");
const { userRouter } = require("./user-router");
const { voucherRouter } = require("./voucher-router");
const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/productType", productTypeRouter);
router.use("/product", productRouter);
router.use("/voucher", voucherRouter);
router.use("/cart", cartRouter);
router.use("/invoice", invoiceRouter);
// router.put("/change-password", changePass);

module.exports = {
  router,
};
