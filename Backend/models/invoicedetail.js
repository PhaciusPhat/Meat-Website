'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InvoiceDetail.belongsTo(models.Product, {
        foreignKey: "ProductId",
      });
      InvoiceDetail.belongsTo(models.Invoice, {
        foreignKey: "InvoiceId",
      });
    }
  };
  InvoiceDetail.init({
    InvoiceId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    Number: DataTypes.INTEGER,
    ProductPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvoiceDetail',
  });
  return InvoiceDetail;
};