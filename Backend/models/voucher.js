'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voucher.hasMany(models.Invoice, {
        foreignKey: "VoucherId",
      });
    }
  };
  Voucher.init({
    VoucherCode: DataTypes.STRING,
    VoucherContent: DataTypes.STRING,
    VoucherStartDay: DataTypes.DATE,
    VoucherEndDay: DataTypes.DATE,
    VoucherDecrease: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
};