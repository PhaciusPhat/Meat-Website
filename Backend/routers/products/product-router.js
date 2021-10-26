const express = require("express");
const {
  createProduct,
  getProductList,
  getProductDetail,
  getProductsOfType,
  deleteProduct,
  updateProduct,
} = require("../../controllers/product-controller");
const {
  authenticate,
  authorize,
} = require("../../middlewares/auth/verifyToken-middleware");
const {
  uploadImageSingle,
} = require("../../middlewares/upload/uploadImage-middleware");

const productRouter = express.Router();

//xem toàn bộ sp
productRouter.get("/", getProductList);
//xem chi tiết sản phẩm
productRouter.get("/:id", getProductDetail);
//xem danh sách sản phẩm theo loại
productRouter.get("/productOfType/:id", getProductsOfType);
//thêm sản phẩm
productRouter.post(
  "/",
  authenticate,
  authorize,
  uploadImageSingle(),
  createProduct
);
//sửa sản phẩm
productRouter.put(
  "/:id",
  authenticate,
  authorize,
  updateProduct
);
//xóa sản phẩm
productRouter.delete("/:id", authenticate, authorize, deleteProduct);

//productRouter

module.exports = {
  productRouter,
};
