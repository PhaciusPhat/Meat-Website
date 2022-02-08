const express = require("express");
const {
  getInvoiceList,
  getInvoiceDetail,
  getUserInvoiceList,
  createInvoice,
} = require("../controllers/invoice-controller");
const { authenticate, authorize } = require("../middlewares/auth/verifyToken-middleware");

const invoiceRouter = express.Router();

invoiceRouter.get("/", authenticate, authorize, getInvoiceList);
invoiceRouter.get("/", authenticate, getInvoiceDetail);
invoiceRouter.get("/userIvoices/", authenticate, getUserInvoiceList);
invoiceRouter.post("/", authenticate, createInvoice);

module.exports = {
  invoiceRouter,
};
