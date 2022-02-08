"use strict";
module.exports = (sequelize, DataTypes) => {
  const Voucher = sequelize.define("Voucher", {
    VoucherCode: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    VoucherContent: DataTypes.STRING,
    VoucherStartDay: DataTypes.DATE,
    VoucherEndDay: DataTypes.DATE,
    VoucherDecrease: DataTypes.INTEGER,
    VoucherNumber: DataTypes.INTEGER,
  });

  Voucher.associate = (models) => {
    Voucher.hasMany(models.Invoice, {
      foreignKey: "VoucherCode",
      as: "Invoice",
    });
  };

  return Voucher;
};
