"use strict";
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define("Invoice", {
    InvoiceId: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    Username: DataTypes.STRING,
    VoucherCode: DataTypes.STRING,
    InvoiceTotalMoney: DataTypes.INTEGER,
    InvoiceBuyDate: DataTypes.DATE,
    Address: DataTypes.STRING,
  });

  Invoice.associate = (models) => {
    Invoice.belongsTo(models.User, {
      foreignKey: "Username",
      as: "User",
    });
    Invoice.hasMany(models.InvoiceDetail, {
      foreignKey: "InvoiceId",
      as: "InvoiceDetail",
    });
    Invoice.belongsTo(models.Voucher, {
      foreignKey: "VoucherCode",
      as: "Voucher",
    });
  };

  return Invoice;
};
