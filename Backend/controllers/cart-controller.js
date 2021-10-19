const { Cart, Product } = require("../models");

const getCartList = async (req, res) => {
  try {
    const { userId } = req.body;
    const CartList = await Cart.findAll({
        where: {
          UserId: userId,
        },
      include: {
        model: Product,
        as: 'Product'
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
    const { userId, productId } = req.body;
    const cartItem = await Cart.findOne({
      where: {
        UserId: userId,
        ProductId: productId,
      },
    });
    if (cartItem) {
      return res.status(400).send("da co sp");
    } else {
      await Cart.create({
        UserId: userId,
        ProductId: productId,
        Number: 1,
        IsBuy: false,
      });
      const CartList = await Cart.findAll({
        where: {
          UserId: userId,
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
    const { userId, productId } = req.body;
    Cart.destroy({
      where: {
        UserId: userId,
        ProductId: productId,
      },
    });
    const CartList = await Cart.findAll({
      where: {
        UserId: userId,
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
