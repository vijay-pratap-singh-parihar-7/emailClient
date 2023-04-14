'use strict'
const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    accessToken: {
      type: Sequelize.STRING,
      allowNull: false
    },
    RefreshToken: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('users');
}

module.exports = { up, down };