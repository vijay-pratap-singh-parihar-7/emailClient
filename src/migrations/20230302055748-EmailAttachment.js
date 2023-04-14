const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('EmailAttachment', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Email_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'email', id: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    FileName: {
      type: Sequelize.STRING,
    },
    size: {
      type: Sequelize.INTEGER,

    },
    Type: {
      type: Sequelize.STRING

    },
    Path: {
      type: Sequelize.STRING,
    }
  });
  await queryInterface.addConstraint("EmailAttachment", {
    type: "foreign key",
    field: ["Email_Id"],
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('EmailAttachment');
}

module.exports = { up, down };