const { User } = require("../models");
const bcryptjs = require("bcryptjs");
//lấy ds user
const getListUser = async (req, res) => {
  try {
    const listUser = await User.findAll();
    return res.status(200).send(listUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

//lấy chi tiết user
const getUserDetail = async (req, res) => {
  try {
    const { Username } = req.query;
    const userDetail = await User.findOne({
      where: { Username },
    });
    if (userDetail) {
      return res.status(200).send(userDetail);
    } else {
      return res.status(404).send("not found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

//tạo user
const createUser = async (req, res) => {
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
    await User.create({
      Username,
      Password: hashPass,
      Phone,
      Role: false,
      Email,
      Address: null,
    });
    return res.status(200).send({ message: "create success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//xóa user
const deleteUser = async (req, res) => {
  try {
    const { Username } = req.query;
    const userDetail = await User.findOne({
      where: { Username },
    });
    if (userDetail) {
      await User.destroy({
        where: {
          Username,
        },
      });
      return res.status(200).send("delete success");
    } else {
      return res.status(404).send("not found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

//cập nhật user
const updateUser = async (req, res) => {
  try {
    const { Username } = req.query;
    const { Phone, Role, Email, Address } = req.body;
    const newRole = Role === undefined ? false : Role;
    console.log(newRole);
    const userDetail = await User.findOne({
      where: { Username },
    });

    if (userDetail) {
      if (Email !== userDetail.Email) {
        //ktra email
        const checkEmail = await User.findOne({ where: { Email } });
        if (checkEmail) {
          return res.status(400).send("email already exists");
        }
      }
      await User.update(
        { Phone, Role: newRole, Email, Address },
        {
          where: {
            Username,
          },
        }
      );
      return res.status(200).send("update success");
    } else {
      return res.status(404).send("not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//change pass user
const changePass = async (req, res) => {
  try {
    const { Username, Password, NewPassword } = req.body;
    //kiểm tra user
    const UserLogin = await User.findOne({
      where: {
        Username,
      },
    });
    if (UserLogin != null) {
      //ktra pass cũ
      const isAuth = bcryptjs.compareSync(Password, UserLogin.Password);
      if (isAuth) {
        //tạo chuỗi ngẫu nhiên
        const salt = bcryptjs.genSaltSync(10);
        //mã hóa passs + salt
        const hashPass = bcryptjs.hashSync(NewPassword, salt);
        //thay đổi trong db
        await User.update(
          { Password: hashPass },
          {
            where: { Username },
          }
        );
        return res.status(200).send("change pass success");
      } else {
        return res.status(400).send("wrong password");
      }
    } else {
      return res.status(404).send("not found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  getListUser,
  deleteUser,
  changePass,
  getUserDetail,
  updateUser,
};
