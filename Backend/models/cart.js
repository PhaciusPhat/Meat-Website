"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    Username: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    ProductId: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    Number: DataTypes.INTEGER,
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.Product, {
      foreignKey: "ProductId",
      as: "Product",
    });
    Cart.belongsTo(models.User, {
      foreignKey: "Username",
      as: "User",
    });
  };

  return Cart;
};
