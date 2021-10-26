const express = require("express");
const {
  getListUser,
  createUser,
  deleteUser,
  updateUser,
  getUserDetail,
  changePass,
} = require("../../controllers/user-controller");
const {
  authenticate,
  authorize,
} = require("../../middlewares/auth/verifyToken-middleware");
const userRouter = express.Router();

userRouter.get("/", authenticate, authorize, getListUser);
userRouter.get("/user-detail", authenticate, getUserDetail);
userRouter.post("/", createUser);
userRouter.put("/:id", authenticate, updateUser);
userRouter.delete("/:id", authenticate, authorize, deleteUser);

userRouter.put("/change-password/", (req,res,next)=>{res.send((123).toString())} ,changePass);

module.exports = {
  userRouter,
};
