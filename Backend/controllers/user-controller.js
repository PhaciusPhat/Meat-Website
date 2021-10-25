const { User } = require("../models");
const bcryptjs = require("bcryptjs");
//lấy ds user
const getListUser = async (req, res) => {
  try {
    const listUser = await User.findAll();
    res.status(200).send(listUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

//lấy chi tiết user
const getUserDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const userDetail = await User.findOne({
      where: { id },
    });
    if (userDetail) {
      return res.status(200).send(userDetail);
    } else {
      return res.status(404).send("not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//tạo user
const createUser = async (req, res) => {
  try {
    const { Username, Password, Phone, Role, Email, Address } = req.body;
    //ktra Username
    const checkUsername = await User.findOne({ where: { Username } });
    if (checkUsername) {
      return res.status(400).send("đã tồn tại username");
    }
    //ktra email
    const checkEmail = await User.findOne({ where: { Email } });
    if (checkEmail) {
      return res.status(400).send("đã tồn tại email");
    }
    //tạo chuỗi ngẫu nhiên
    const salt = bcryptjs.genSaltSync(10);
    //mã hóa passs + salt
    const hashPass = bcryptjs.hashSync(Password, salt);
    await User.create({
      Username,
      Password: hashPass,
      Phone,
      Role,
      Email,
      Address,
    });
    res.status(200).send({message: "Tạo thành công!"});
  } catch (error) {
    res.status(500).send(error);
  }
};

//xóa user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDetail = await User.findOne({
      where: { id },
    });
    if (userDetail) {
      await User.destroy({
        where: {
          id,
        },
      });
      const list = await User.findAll();
      res.status(200).send(list);
    } else {
      return res.status(404).send("not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//cập nhật user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { Phone, Role, Email, Address } = req.body;
    //ktra email
    const checkEmail = await User.findOne({ where: { Email } });
    if (checkEmail) {
      return res.status(400).send("đã tồn tại email");
    }
    const userDetail = await User.findOne({
      where: { id },
    });
    if (userDetail) {
      await User.update(
        { Phone, Role, Email, Address },
        {
          where: {
            id,
          },
        }
      );
      const list = await User.findAll();
      res.status(200).send(list);
    } else {
      return res.status(404).send("not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//reset pass user
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
        const list = await User.findAll();
        res.status(200).send(list);
      } else {
        return res.status(400).send("sai mật khẩu");
      }
    } else {
      return res.status(404).send("not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
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
