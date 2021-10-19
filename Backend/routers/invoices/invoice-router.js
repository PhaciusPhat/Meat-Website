const express = require("express");
const {
  getInvoiceList,
  getInvoiceDetail,
  getUserInvoiceList,
  createInvoice,
} = require("../../controllers/invoice-controller");

const invoiceRouter = express.Router();

invoiceRouter.get("/", getInvoiceList);
invoiceRouter.get("/:id", getInvoiceDetail);
invoiceRouter.get("/userIvoices/:id", getUserInvoiceList);
invoiceRouter.post("/", createInvoice);


module.exports = {
  invoiceRouter,
};
