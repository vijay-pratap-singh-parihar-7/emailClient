'use strict'
const sequelize = require('sequelize');
const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('emailFolder', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    folderName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    ProviderId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('emailFolder');
}

module.exports = { up, down };