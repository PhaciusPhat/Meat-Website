const { Cart, Product } = require("../models");

const getCartList = async (req, res) => {
  try {
    const { id } = req.user;
    const CartList = await Cart.findAll({
      where: {
        UserId: id,
      },
      include: {
        model: Product,
        as: "Product",
      },
    });
    return res.status(200).send(CartList);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const addProductIntoCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;
    //kiem tra san pham
    const cartItem = await Cart.findOne({
      where: {
        UserId: id,
        ProductId: productId,
      },
    });
    if (cartItem) {
      return res.status(400).send("da co sp");
    } else {
      await Cart.create({
        UserId: id,
        ProductId: productId,
        Number: 1,
      });
      const CartList = await Cart.findAll({
        where: {
          UserId: id,
        },
      });
      return res.status(200).send(CartList);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;
    Cart.destroy({
      where: {
        UserId: id,
        ProductId: productId,
      },
    });
    const CartList = await Cart.findAll({
      where: {
        UserId: id,
      },
    });
    return res.status(200).send(CartList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getCartList,
  addProductIntoCart,
  deleteProductInCart,
};
