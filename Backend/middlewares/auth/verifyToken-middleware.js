const jwt = require("jsonwebtoken");
//kiểm tra đăng nhập
const authenticate = (req, res, next) => {
  try {
    //lấy token
    const token = req.header("token");
    //ktra token
    if (token) {
      const secretKey = "DOANXEM";
      //decode token
      const decode = jwt.verify(token, secretKey);
      //gán thông tin user
      req.user = decode;
      next();
    } else {
      return res.status(401).send({
        message: "chưa đăng nhập",
      });
    }
  } catch (error) {
    res
      .status(401)
      .send({ message: "hết hạn đăng nhập vui lòng đăng nhập lại" });
  }
};
//kiểm tra phân quyền
const authorize = (req, res, next) => {
  try {
    const { user } = req;
    console.log(user.Role);
    if (user.Role != true) {
      res.status(403).send({ message: "bạn ko có quyền" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  authenticate,
  authorize,
};
