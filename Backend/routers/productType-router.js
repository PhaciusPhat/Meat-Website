const express = require("express");
const {
  getProductTypeList,
  getProductTypeDetail,
  createProductType,
  deleteProductType,
  updateProductType,
} = require("../controllers/productType-controller");
const {
  authorize,
  authenticate,
} = require("../middlewares/auth/verifyToken-middleware");

const productTypeRouter = express.Router();

//xem toàn bộ loại sp
productTypeRouter.get("/", getProductTypeList);
//xem chi tiết loại sp
productTypeRouter.get("/", getProductTypeDetail);
//thêm loại sp
// authenticate, authorize,
productTypeRouter.post("/", createProductType);
//sửa loại sp
productTypeRouter.put("/", updateProductType);
//xóa loại sp
productTypeRouter.delete("/", deleteProductType);


module.exports = {
  productTypeRouter,
};
