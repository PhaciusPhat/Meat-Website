const { Invoice, User, Product, InvoiceDetail, Cart } = require("../models");

const getInvoiceList = async (req, res) => {
  try {
    const InvoiceList = await Invoice.findAll();
    return res.status(200).send(InvoiceList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getUserInvoiceList = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (user) {
      const InvoiceList = await Invoice.findAll({
        where: {
          UserId: id,
        },
      });
      return res.status(200).send(InvoiceList);
    } else {
      return res.status(404).send("not found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getInvoiceDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const invoiceDetail = await InvoiceDetail.findAll({
      where: {
        InvoiceId: id,
      },
      include: {
        model: Product,
      },
    });
    return res.status(200).send(invoiceDetail);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createInvoice = async (req, res) => {
  try {
    //lấy thông tin
    const {
      UserId,
      InvoiceTotalMoney,
      VoucherId,
      InvoiceBuyDate,
      Address,
      //lấy ds sản phẩm mua
      productList,
    } = req.body;
    //tạo hóa đơn mới
    await Invoice.create({
      UserId,
      VoucherId,
      InvoiceTotalMoney,
      InvoiceBuyDate,
      Address,
    });
    const InvoiceList = await Invoice.findAll({ where: { UserId } });
    //lấy id của hóa đơn vừa tạo
    const invoiceID = InvoiceList[InvoiceList.length - 1].id;

    productList.forEach(async (element) => {
      element.InvoiceId = invoiceID;
      await Cart.destroy({
        where: {
          UserId,
          ProductId: element.ProductId,
        },
      });
    });

    //thêm ds sản phẩm mua vào chi tiết hóa đơn
    await InvoiceDetail.bulkCreate(productList);
    //xóa ds sản phẩm mua trong giỏ hàng

    return res.status(200).send(InvoiceList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getInvoiceList,
  getUserInvoiceList,
  getInvoiceDetail,
  createInvoice,
};
