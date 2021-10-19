const express = require("express");
const {
  getProductTypeList,
  getProductTypeDetail,
  createProductType,
  deleteProductType,
  updateProductType,
} = require("../../controllers/productType-controller");

const productTypeRouter = express.Router();

//xem toàn bộ loại sp
productTypeRouter.get("/", getProductTypeList);
//xem chi tiết loại sp
productTypeRouter.get("/:id", getProductTypeDetail);
//thêm loại sp
productTypeRouter.post("/", createProductType);
//sửa loại sp
productTypeRouter.put("/:id", updateProductType);
//xóa loại sp
productTypeRouter.delete("/:id", deleteProductType);

module.exports = {
  productTypeRouter,
};
