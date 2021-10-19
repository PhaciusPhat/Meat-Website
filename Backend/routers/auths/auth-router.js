const express = require("express");
const { signIn } = require("../../controllers/auth-controller");

const authRouter = express.Router();

authRouter.post("/sign-in", signIn);

module.exports = {
  authRouter,
};
