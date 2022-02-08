const { makeid } = require("../general-variable");
const { Product } = require("../models");

const getProductList = async (req, res) => {
  try {
    const ProductList = await Product.findAll();
    return res.status(200).send(ProductList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getProductDetail = async (req, res) => {
  try {
    const { ProductId } = req.query;
    const ProductDetail = await Product.findOne({
      where: {
        ProductId,
      },
    });
    if (ProductDetail) {
      return res.status(200).send(ProductDetail);
    } else {
      return res.status(404).send("Not found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getProductsOfType = async (req, res) => {
  try {
    const { ProductTypeId } = req.query;
    const ProductsOfType = await Product.findAll({
      where: {
        ProductTypeId,
      },
    });
    if (ProductsOfType) {
      return res.status(200).send(ProductsOfType);
    } else {
      return res.status(404).send("Not found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { file } = req;
    const {
      ProductName,
      ProductPrice,
      ProductNumber,
      ProductDescribe,
      ProductTypeId,
    } = req.body;
    let url = `http://localhost:2222/${file.path}`;
    url = url.replace(/\\/g, "/");
    await Product.create({
      ProductId: "PD_" + makeid(10),
      ProductName,
      ProductPrice,
      ProductNumber,
      ProductDescribe,
      ProductImage: url,
      ProductTypeId,
    });
    return res.status(200).send("create success");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { ProductId } = req.query;
    const ProductDetail = await Product.findOne({
      where: {
        ProductId,
      },
    });
    const {
      ProductName,
      ProductPrice,
      ProductNumber,
      ProductDescribe,
      ProductTypeId,
    } = req.body;

    if (ProductDetail) {
      await Product.update(
        {
          ProductName,
          ProductPrice,
          ProductNumber,
          ProductDescribe,
          ProductTypeId,
        },
        {
          where: {
            ProductId,
          },
        }
      );

      return res.status(200).send("update success");
    } else {
      return res.status(404).send("Not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { ProductId } = req.query;
    const ProductDetail = await Product.findOne({
      where: {
        ProductId,
      },
    });
    if (ProductDetail) {
      await Product.destroy({
        where: {
          ProductId,
        },
      });
      return res.status(200).send("delete success");
    } else {
      return res.status(404).send("Not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getProductList,
  getProductDetail,
  getProductsOfType,
  createProduct,
  deleteProduct,
  updateProduct,
};
