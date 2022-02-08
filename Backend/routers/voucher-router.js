const express = require("express");
const {
  getVoucherList,
  getVoucherDetail,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} = require("../controllers/voucher-controller");
const {
  authenticate, authorize,
} = require("../middlewares/auth/verifyToken-middleware");

const voucherRouter = express.Router();

voucherRouter.get("/", authenticate, getVoucherList);
voucherRouter.get("/", authenticate, getVoucherDetail);
voucherRouter.post("/", authenticate, authorize, createVoucher);
voucherRouter.put("/", authenticate, authorize, updateVoucher);
voucherRouter.delete("/", authenticate, authorize, deleteVoucher);

module.exports = {
  voucherRouter,
};
