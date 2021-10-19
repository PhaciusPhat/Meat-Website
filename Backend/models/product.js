"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart, {
        foreignKey: "ProductId",
      });
      Product.hasMany(models.InvoiceDetail, {
        foreignKey: "ProductId",
      });
      Product.belongsTo(models.ProductType, {
        foreignKey: "TypeId",
      });
    }
  }
  Product.init(
    {
      ProductName: DataTypes.STRING,
      ProductPrice: DataTypes.INTEGER,
      ProductNumber: DataTypes.INTEGER,
      ProductImage: DataTypes.STRING,
      ProductDescribe: DataTypes.STRING,
      TypeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
