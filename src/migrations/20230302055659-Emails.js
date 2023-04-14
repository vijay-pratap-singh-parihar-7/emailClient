'use strict'
const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('email', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Body: {
      type: Sequelize.STRING,
    },
    Subject: {
      type: Sequelize.STRING,
    },
    ThreadId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    isRead: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    messageId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    inReplyTo: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false

    },
    scheduledAt: {
      type: Sequelize.DATE,
      allowNull: true

    },
    Snippet: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isArchieved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isTrashed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,

    }
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('email');
}

module.exports = { up, down };