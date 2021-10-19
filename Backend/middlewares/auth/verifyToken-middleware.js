const jwt = require("jsonwebtoken");
//kiểm tra đăng nhập
const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const secretKey = "DOANXEM";
    const decode = jwt.verify(token, secretKey);
    //gán thông tin user
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

const authorize = (req, res, next) => {
    try {
        const {user} = req;
        if(user.role != "admin"){
            res.status(403).send("bạn ko có quyền");
        }  else{
            next();
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    authenticate,
    authorize,
}
