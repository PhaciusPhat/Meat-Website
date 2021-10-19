'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      Invoice.hasMany(models.InvoiceDetail, {
        foreignKey: "InvoiceId",
      });
      Invoice.belongsTo(models.Voucher, {
        foreignKey: "VoucherId",
      });
    }
  };
  Invoice.init({
    UserId: DataTypes.INTEGER,
    VoucherId: DataTypes.INTEGER,
    InvoiceTotalMoney: DataTypes.INTEGER,
    InvoiceBuyDate: DataTypes.DATE,
    Address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};