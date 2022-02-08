const { makeid } = require("../general-variable");
const { ProductType } = require("../models");

const getProductTypeList = async (req, res) => {
  try {
    const ProductTypeList = await ProductType.findAll();
    return res.status(200).send(ProductTypeList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getProductTypeDetail = async (req, res) => {
  try {
    const { ProductTypeId } = req.query;
    const ProductTypeDetail = await ProductType.findOne({
      where: {
        ProductTypeId,
      },
    });
    if (ProductTypeDetail) {
      return res.status(200).send(ProductTypeDetail);
    } else {
      return res.status(404).send("Not found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createProductType = async (req, res) => {
  try {
    const { ProductTypeName } = req.body;
    const checkTypeName = await ProductType.findOne({
      where: { ProductTypeName },
    });
    if (checkTypeName) {
      return res.status(400).send("already exists this name");
    }
    await ProductType.create({
      ProductTypeName,
      ProductTypeId: "PDT_" + makeid(10),
    });
    return res.status(200).send("create success");
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateProductType = async (req, res) => {
  try {
    const { ProductTypeId } = req.query;
    const { ProductTypeName } = req.body;
    const checkTypeName = await ProductType.findOne({
      where: { ProductTypeName },
    });
    if (checkTypeName) {
      return res.status(400).send("already exists this name");
    }
    await ProductType.update(ProductTypeName, {
      where: {
        ProductTypeId,
      },
    });
    return res.status(200).send("update success");
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteProductType = async (req, res) => {
  try {
    const { ProductTypeId } = req.query;
    const checkTypeName = await ProductType.findOne({
      where: { ProductTypeId },
    });
    if (checkTypeName) {
      await ProductType.destroy({
        where: {
          ProductTypeId,
        },
      });
      return res.status(200).send("delete success");
    }
    return res.status(404).send("not found");
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getProductTypeList,
  getProductTypeDetail,
  createProductType,
  updateProductType,
  deleteProductType,
};
