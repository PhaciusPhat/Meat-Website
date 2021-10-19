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

userRouter.get("/", getListUser);
userRouter.get("/:id", getUserDetail);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/changePassword/", changePass)
// authenticate, authorize,
module.exports = {
  userRouter,
};
