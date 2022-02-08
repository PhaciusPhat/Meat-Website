"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductType = sequelize.define("ProductType", {
    ProductTypeId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ProductTypeName: DataTypes.STRING,
  });

  ProductType.association = (models) => {
    ProductType.hasMany(models.Product, {
      foreignKey: "ProductTypeId",
      as: "Product",
    });
  };

  return ProductType;
};
