const express = require("express");
const {
  getVoucherList,
  getVoucherDetail,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} = require("../../controllers/voucher-controller");

const voucherRouter = express.Router();

voucherRouter.get("/", getVoucherList);
voucherRouter.get("/:id", getVoucherDetail);
voucherRouter.post("/", createVoucher);
voucherRouter.put("/:id", updateVoucher);
voucherRouter.delete("/:id", deleteVoucher);

module.exports = {
    voucherRouter,
};
