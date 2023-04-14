const sql = require("mysql2");
const {Client} = require("pg");
const makeUserDbMethods = require('./usersDbActions');
const makeEmailFoldersDbMethods = require('./emailFoldersDbActions');

const connection = new Client({
    user: 'root',
    host: 'localhost',
    database: 'emailclient',
    password: 'admin',
    port: 26257,
    ssl: {
      rejectUnauthorized: false
    }
  });

connection.connect((err) => {
    if(err)
    {
        console.error("Error connecting to cockroachDB server: ", err);
    }
    else{
        console.log("Connected to cockroachDB server!",err);
    }
})


const db = connection;


const users = makeUserDbMethods({db});
const emailFolders = makeEmailFoldersDbMethods({db});

const dbMethods ={
    users,
    emailFolders
}

module.exports = dbMethods;