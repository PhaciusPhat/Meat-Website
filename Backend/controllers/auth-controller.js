const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const userLogin = await User.findOne({
      where: {
        Username,
      },
    });
    if (userLogin == null) res.status(404).send("not found");
    else {
      //kiểm tra password
      const isAuth = bcryptjs.compareSync(Password, userLogin.Password);
      if (isAuth) {
        //tạo payload cho token
        payload = {
          id: userLogin.id,
          Username: userLogin.Username,
          Phone: userLogin.Phone,
          Role: userLogin.Role,
          Email: userLogin.Email,
          Address: userLogin.Address,
        };
        //tạo secret key
        const secretKey = "DOANXEM";
        //tạo token
        const token = jwt.sign(payload, secretKey, { expiresIn: 10 * 60 * 60 });
        res.status(200).send({
          message: "đăng nhập thành công",
          token,
          id: userLogin.id,
          Username: userLogin.Username,
          Phone: userLogin.Phone,
          Role: userLogin.Role,
          Email: userLogin.Email,
          Address: userLogin.Address,
        });
      } else {
        res.status(400).send("sai pass");
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  signIn,
};
