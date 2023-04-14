const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('emailFolderAssociation', {
    Email_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: 'email', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Folder_Id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: 'emailFolder', key: 'id' }
    }
  });
  await queryInterface.addConstraint('emailFolderAssociation', {
    field: ["Email_id", "Folder_Id"],
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });

}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('emailFolderAssociation');
}

module.exports = { up, down };
