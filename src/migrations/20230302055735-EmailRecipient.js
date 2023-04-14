const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('EmailRecipient', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Email_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "email", key: "id" },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Email_Address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Type: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('EmailRecipient');
}

module.exports = { up, down };