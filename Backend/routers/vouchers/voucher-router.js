const express = require("express");
const {
  getVoucherList,
  getVoucherDetail,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} = require("../../controllers/voucher-controller");
const {
  authenticate, authorize,
} = require("../../middlewares/auth/verifyToken-middleware");

const voucherRouter = express.Router();

voucherRouter.get("/", authenticate, getVoucherList);
voucherRouter.get("/:id", authenticate, getVoucherDetail);
voucherRouter.post("/", authenticate, authorize, createVoucher);
voucherRouter.put("/:id", authenticate, authorize, updateVoucher);
voucherRouter.delete("/:id", authenticate, authorize, deleteVoucher);

module.exports = {
  voucherRouter,
};
