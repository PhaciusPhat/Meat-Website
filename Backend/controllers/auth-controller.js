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
    if (userLogin == null)
      return res.status(404).send("not exits this account");
    else {
      //kiểm tra password
      const isAuth = bcryptjs.compareSync(Password, userLogin.Password);
      if (isAuth) {
        //tạo payload cho token
        payload = {
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
        return res.status(200).send({
          message: "login success",
          token,
          userInfo: payload,
        });
      } else {
        return res.status(400).send("wrong pass");
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const signUp = async (req, res) => {
  try {
    const { Username, Password, Phone, Email } = req.body;
    //ktra Username
    const checkUsername = await User.findOne({ where: { Username } });
    if (checkUsername) {
      return res.status(400).send("username already exists");
    }
    //ktra email
    const checkEmail = await User.findOne({ where: { Email } });
    if (checkEmail) {
      return res.status(400).send("email already exists");
    }
    //tạo chuỗi ngẫu nhiên
    const salt = bcryptjs.genSaltSync(10);
    //mã hóa passs + salt
    const hashPass = bcryptjs.hashSync(Password, salt);
    // tạo user
    await User.create({
      Username,
      Password: hashPass,
      Phone,
      Role: false,
      Email,
      Address: null,
    });
    //tạo payload cho token
    payload = {
      Username,
      Phone,
      Role: false,
      Email,
      Address: null,
    };
    //tạo secret key
    const secretKey = "DOANXEM";
    //tạo token
    const token = jwt.sign(payload, secretKey, { expiresIn: 10 * 60 * 60 });
    return res.status(200).send({
      message: "signup success",
      token,
      userInfo: payload,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  signIn,
  signUp
};
