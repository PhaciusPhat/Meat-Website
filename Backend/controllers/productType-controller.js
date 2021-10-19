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
    const { id } = req.params;
    const ProductTypeDetail = await ProductType.findOne({
      where: {
        id,
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
    const { TypeName } = req.body;
    const ProductTypeDetail = await ProductType.create({ TypeName });
    return res.status(200).send(ProductTypeDetail);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateProductType = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductType.update(req.body,{
      where: {
        id,
      },
    });
    const ProductTypeList = await ProductType.findAll();
    return res.status(200).send(ProductTypeList);
  } catch (error) {
    return res.status(500).send(error);
  }
}

const deleteProductType = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductType.destroy({
      where: {
        id,
      },
    });
    return res.status(200).send("xóa thành công");
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
