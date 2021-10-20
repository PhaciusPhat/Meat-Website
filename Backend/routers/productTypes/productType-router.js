const express = require("express");
const {
  getProductTypeList,
  getProductTypeDetail,
  createProductType,
  deleteProductType,
  updateProductType,
} = require("../../controllers/productType-controller");
const {
  authorize,
  authenticate,
} = require("../../middlewares/auth/verifyToken-middleware");

const productTypeRouter = express.Router();

//xem toàn bộ loại sp
productTypeRouter.get("/", getProductTypeList);
//xem chi tiết loại sp
productTypeRouter.get("/:id", getProductTypeDetail);
//thêm loại sp
productTypeRouter.post("/", authenticate, authorize, createProductType);
//sửa loại sp
productTypeRouter.put("/:id", authenticate, authorize, updateProductType);
//xóa loại sp
productTypeRouter.delete("/:id", authenticate, authorize, deleteProductType);

module.exports = {
  productTypeRouter,
};
