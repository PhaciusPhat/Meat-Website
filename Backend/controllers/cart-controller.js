const { Cart, Product } = require("../models");

const getCartList = async (req, res) => {
  try {
    const { Username } = req.user;
    const CartList = await Cart.findAll({
      where: {
        Username,
      },
      include: {
        model: Product,
        as: "Product",
      },
    });
    return res.status(200).send(CartList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const addProductIntoCart = async (req, res) => {
  try {
    const { Username } = req.user;
    const { productId } = req.body;
    //kiem tra san pham
    const cartItem = await Cart.findOne({
      where: {
        Username,
        ProductId: productId,
      },
    });
    if (cartItem) {
      await Cart.update(
        { Number: cartItem.Number + 1 },
        { where: { Username, ProductId: productId } }
      );
      return res.status(200).send("Add to cart success");
    } else {
      await Cart.create({
        Username,
        ProductId: productId,
        Number: 1,
      });
      return res.status(200).send("Add to cart success");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const { Username } = req.user;
    const { DelList } = req.body;
    for (let index = 0; index < DelList.length; index++) {
      await Cart.destroy({
        where: {
          Username,
          ProductId: DelList[index].ProductId,
        },
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getCartList,
  addProductIntoCart,
  deleteProductInCart,
};
