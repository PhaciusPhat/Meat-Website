'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ProductPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ProductNumber: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ProductImage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ProductDescribe: {
        allowNull: false,
        type: Sequelize.STRING
      },
      TypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "ProductTypes",
          key: "id"
        }
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
    await queryInterface.dropTable('Products');
  }
};