const sql = require("mysql2");
const makeUserDbMethods = require('./usersDbActions');
const makeEmailFoldersDbMethods = require('./emailFoldersDbActions');

const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'emailClient',
    password: 'admin'
});

connection.connect((err) => {
    if(err)
    {
        console.error("Error connecting to mysql server: ", err);
    }
    else{
        console.log("Connected to MySql server!");
    }
})


const db = connection.promise();


const users = makeUserDbMethods({db});
const emailFolders = makeEmailFoldersDbMethods({db});

const dbMethods ={
    users,
    emailFolders
}

module.exports = dbMethods;