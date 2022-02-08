"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const InvoiceDetail = sequelize.define("InvoiceDetail", {
    InvoiceId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ProductId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Number: DataTypes.INTEGER,
    ProductPrice: DataTypes.INTEGER,
  });

  InvoiceDetail.associate = (models) => {
    InvoiceDetail.belongsTo(models.Product, {
      foreignKey: "ProductId",
      as: "Product",
    });
    InvoiceDetail.belongsTo(models.Invoice, {
      foreignKey: "InvoiceId",
      as: "Invoice",
    });
  };

  return InvoiceDetail;
};
