'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.DECIMAL
      },
      category: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.DECIMAL
      },
      img: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      isSold: {
        type: Sequelize.BOOLEAN
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
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Items');
  }
};