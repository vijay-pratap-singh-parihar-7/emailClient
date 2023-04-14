const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');


const sequelize = new Sequelize("emailclient", "root", "admin", {
  dialect: 'postgres',
  host: 'localhost',
  port: 26257,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const umzug = new Umzug({
  migrations: { glob: "./migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  await umzug.up();
})();

