'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      Password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      Address: {
        allowNull: true,
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
    await queryInterface.dropTable('Users');
  }
};