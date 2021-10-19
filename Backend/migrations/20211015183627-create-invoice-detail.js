'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InvoiceDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      InvoiceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: "Invoices",
          key: "id"
        }
      },
      ProductId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: "Products",
          key: "id"
        }
      },
      Number: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ProductPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('InvoiceDetails');
  }
};