const express = require("express");
const {
  createProduct,
  getProductList,
  getProductDetail,
  getProductsOfType,
  deleteProduct,
  updateProduct,
} = require("../controllers/product-controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verifyToken-middleware");
const {
  uploadImageSingle,
} = require("../middlewares/upload/uploadImage-middleware");

const productRouter = express.Router();

//xem toàn bộ sp
productRouter.get("/", getProductList);
//xem chi tiết sản phẩm
productRouter.get("/", getProductDetail);
//xem danh sách sản phẩm theo loại
productRouter.get("/productOfType/", getProductsOfType);
//thêm sản phẩm
productRouter.post(
  "/",
  // authenticate,
  // authorize,
  uploadImageSingle(),
  createProduct
);
// authenticate, authorize,
//sửa sản phẩm
productRouter.put("/",  updateProduct);
//xóa sản phẩm
productRouter.delete("/", deleteProduct);

//productRouter

module.exports = {
  productRouter,
};
