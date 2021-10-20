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
    const InvoiceList = await Invoice.findAll({
      where: {
        UserId: id,
      },
    });
    return res.status(200).send(InvoiceList);
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
    if (invoiceDetail) {
      return res.status(200).send(invoiceDetail);
    }
    return res.status(404).send("not-found");
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createInvoice = async (req, res) => {
  try {
    //lấy thông tin
    const UserId = req.user.id;
    const {
      InvoiceTotalMoney,
      VoucherId,
      InvoiceBuyDate,
      Address,
      //lấy ds sản phẩm mua
      productList,
    } = req.body;
    //lay ds sp
    const ProductList = await Product.findAll();
    //kiểm tra số lương trong kho
    let errorProduct = [];
    productList.forEach((element) => {
      let temp = ProductList.find((e) => e.id === element.ProductId);
      if (temp.ProductNumber < element.Number) {
        errorProduct.push(temp);
      }
    });
    if (errorProduct.length > 0) {
      return res.status(400).send(errorProduct);
    }
    //tạo hóa đơn mới
    await Invoice.create({
      UserId,
      VoucherId,
      InvoiceTotalMoney,
      InvoiceBuyDate,
      Address,
    });
    //lấy id của hóa đơn vừa tạo
    const InvoiceList = await Invoice.findAll();
    const invoiceID = InvoiceList[InvoiceList.length - 1].id;

    productList.forEach(async (element) => {
      //xóa ds sản phẩm mua trong giỏ hàng
      element.InvoiceId = invoiceID;
      await Cart.destroy({
        where: {
          UserId,
          ProductId: element.ProductId,
        },
      });
      //trừ so luong sp trong data
      let temp = ProductList.find((e) => e.id === element.ProductId);
      await Product.update(
        {
          ProductNumber: temp.ProductNumber - element.Number,
        },
        {
          where: {
            id: element.ProductId,
          },
        }
      );
    });
    //thêm ds sản phẩm mua vào chi tiết hóa đơn
    await InvoiceDetail.bulkCreate(productList);

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
