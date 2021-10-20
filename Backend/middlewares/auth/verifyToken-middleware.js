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
      return res.status(401).send("chưa sign in");
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
//kiểm tra phân quyền
const authorize = (req, res, next) => {
  try {
    const { user } = req;
    console.log(user.Role)
    if (user.Role != "admin") {
      res.status(403).send("bạn ko có quyền");
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
