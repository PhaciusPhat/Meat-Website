const express = require("express");
const {
  getListUser,
  createUser,
  deleteUser,
  updateUser,
  getUserDetail,
  changePass,
} = require("../controllers/user-controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verifyToken-middleware");
const userRouter = express.Router();
// authenticate, authorize,
userRouter.get("/",  getListUser);
userRouter.get("/user-detail/",  getUserDetail);
userRouter.put("/change-pass/",  changePass);
userRouter.post("/", createUser);
userRouter.put("/",  updateUser);
userRouter.delete("/", deleteUser);

module.exports = {
  userRouter,
};
