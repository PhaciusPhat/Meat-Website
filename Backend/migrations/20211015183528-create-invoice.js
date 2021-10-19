'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: "Users",
          key: "id"
        }
      },
      VoucherId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references:{
          model: "Vouchers",
          key: "id"
        }
      },
      InvoiceTotalMoney: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      InvoiceBuyDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Invoices');
  }
};