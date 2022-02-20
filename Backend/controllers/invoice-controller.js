const { Op } = require("sequelize");
const { makeid } = require("../general-variable");
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
    const { Username } = req.query;
    const InvoiceList = await Invoice.findAll({
      where: {
        Username: {
          [Op.substring]: Username,
        },
      },
    });
    return res.status(200).send(InvoiceList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getInvoiceDetail = async (req, res) => {
  try {
    const { InvoiceId } = req.query;
    console.log("InvoiceId: ", InvoiceId);
    const invoiceDetail = await InvoiceDetail.findAll({
      where: {
        InvoiceId,
      },
      include: {
        model: Product,
        as: "Product",
      },
    });
    const result = {};
    result.InvoiceId = InvoiceId;
    result.ProductList = [];
    result.TotalMoney = 0;
    for (let i = 0; i < invoiceDetail.length; i++) {
      result.TotalMoney +=
        Number(invoiceDetail[i].Number) * Number(invoiceDetail[i].ProductPrice);
      result.ProductList.push({
        ProductId: invoiceDetail[i].ProductId,
        Number: invoiceDetail[i].Number,
        ProductPrice: invoiceDetail[i].ProductPrice,
        ProductName: invoiceDetail[i].Product.ProductName,
        ProductImage: invoiceDetail[i].Product.ProductImage,
      });
    }
    return res.status(200).send(result);
  } catch (error) {
    console.log("lỗi: ", error);
    return res.status(500).send(error);
  }
};

const createInvoice = async (req, res) => {
  try {
    //lấy thông tin
    const { Username } = req.user;
    const {
      InvoiceTotalMoney,
      VoucherId,
      Address,
      //lấy ds sản phẩm mua
      productList,
    } = req.body;
    //lay ds sp
    const ProductList = await Product.findAll();
    //kiểm tra số lương trong kho
    let errorProduct = [];
    productList.forEach((element) => {
      let temp = ProductList.find((e) => e.ProductId === element.ProductId);
      if (temp.ProductNumber < element.Number) {
        errorProduct.push(temp);
      }
    });
    if (errorProduct.length > 0) {
      return res.status(400).send(errorProduct);
    }
    //tạo hóa đơn mới
    const invoiceID = "IV_" + makeid(10);
    await Invoice.create({
      InvoiceId: invoiceID,
      Username,
      VoucherId,
      InvoiceTotalMoney,
      Address,
    });

    productList.forEach(async (element) => {
      //xóa ds sản phẩm mua trong giỏ hàng
      element.InvoiceId = invoiceID;
      await Cart.destroy({
        where: {
          Username,
          ProductId: element.ProductId,
        },
      });
      //trừ so luong sp trong data
      let temp = ProductList.find((e) => e.ProductId === element.ProductId);
      await Product.update(
        {
          ProductNumber: temp.ProductNumber - element.Number,
        },
        {
          where: {
            ProductId: element.ProductId,
          },
        }
      );
    });
    //thêm ds sản phẩm mua vào chi tiết hóa đơn
    await InvoiceDetail.bulkCreate(productList);

    return res.status(200).send("create success");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getInvoiceList,
  getUserInvoiceList,
  getInvoiceDetail,
  createInvoice,
};
