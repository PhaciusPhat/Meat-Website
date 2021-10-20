const express = require("express");
const {
  getListUser,
  createUser,
  deleteUser,
  changePass,
  updateUser,
  getUserDetail,
} = require("../../controllers/user-controller");
const {
  authenticate,
  authorize,
} = require("../../middlewares/auth/verifyToken-middleware");
const userRouter = express.Router();

userRouter.get("/", authenticate, authorize, getListUser);
userRouter.get("/:id", authenticate, getUserDetail);
userRouter.post("/", createUser);
userRouter.put("/:id", authenticate, updateUser);
userRouter.delete("/:id", authenticate, authorize, deleteUser);
userRouter.put("/changePassword/", authenticate, changePass);
module.exports = {
  userRouter,
};
