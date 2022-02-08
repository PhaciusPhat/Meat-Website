"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    ProductId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ProductName: DataTypes.STRING,
    ProductPrice: DataTypes.INTEGER,
    ProductNumber: DataTypes.INTEGER,
    ProductImage: DataTypes.STRING,
    ProductDescribe: DataTypes.STRING,
    ProductTypeId: DataTypes.STRING,
  });

  Product.associate = (models) => {
    Product.hasMany(models.Cart, {
      foreignKey: "ProductId",
      as: "Cart",
    });
    Product.hasMany(models.InvoiceDetail, {
      foreignKey: "ProductId",
      as: "InvoiceDetail",
    });
    Product.belongsTo(models.ProductType, {
      foreignKey: "ProductTypeId",
      as: "ProductType",
    });
  };

  return Product;
};
