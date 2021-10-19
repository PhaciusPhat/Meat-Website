const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const userLogin = await User.findOne({
      where: {
        Username,
      },
    });
    if (userLogin == null) res.status(404).send("not found");
    else {
      const isAuth = bcryptjs.compareSync(Password, userLogin.Password);
      if (isAuth) {
        //tạo token
        payload = {
          id: userLogin.id,
          Username: userLogin.Username,
          Phone: userLogin.Phone,
          Role: userLogin.Role,
          Email: userLogin.Email,
          Address: userLogin.Address,
        };
        const secretKey = "DOANXEM";
        const token = jwt.sign(payload, secretKey, { expiresIn: 10 * 60 * 60 });
        res.status(200).send({
          message: "đăng nhập thành công",
          token,
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
