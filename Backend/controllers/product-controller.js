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
    const { id } = req.params;
    const ProductDetail = await Product.findOne({
      where: {
        id,
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
    const { id } = req.params;
    const ProductsOfType = await Product.findAll({
      where: {
        TypeId: id,
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
    console.log(file);
    const {
      ProductName,
      ProductPrice,
      ProductNumber,
      ProductDescribe,
      TypeId,
    } = req.body;
    const url = `http://localhost:2222/${file.path}`;
    await Product.create({
      ProductName,
      ProductPrice,
      ProductNumber,
      ProductDescribe,
      ProductImage: url,
      TypeId,
    });
    const ProductList = await Product.findAll();
    return res.status(200).send(ProductList);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const ProductDetail = await Product.findOne({
      where: {
        id,
      },
    });
    const {
      ProductName,
      ProductPrice,
      ProductNumber,
      ProductDescribe,
      TypeId,
    } = req.body;

    if (ProductDetail) {
      await Product.update(
        {
          ProductName,
          ProductPrice,
          ProductNumber,
          ProductDescribe,
          TypeId,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).send("..");
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
    const { id } = req.params;
    const ProductDetail = await Product.findOne({
      where: {
        id,
      },
    });
    if (ProductDetail) {
      await Product.destroy({
        where: {
          id,
        },
      });
      const ProductList = await Product.findAll();
      return res.status(200).send(ProductList);
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
