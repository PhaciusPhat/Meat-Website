"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Vouchers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      VoucherCode: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      VoucherContent: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      VoucherStartDay: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      VoucherEndDay: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      VoucherDecrease: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Vouchers");
  },
};
