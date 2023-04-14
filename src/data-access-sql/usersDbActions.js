function makeUserDbMethods({db}){
    return Object.freeze({
        getAllUsers,
        createUser,
        updateUser,
        deleteUser
    })
    async function getAllUsers({dbName}){
        try{
            const [result] = await db.query(`SELECT * FROM ${dbName}.users`);
            return result;
        }
        catch(err){
            throw err;
        }
    }
    

    async function createUser({
        dbName,
        email,
        name,
        accessToken,
        refreshToken,
        password
    }){
        try{
            const [result] = await db.query(`INSERT into ${dbName}.users (Name, Email, accessToken, RefreshToken, Password) VALUES(?,?,?,?,?)`, [name, email, accessToken, refreshToken,password]);
            return result;
        }
        catch(err){
            throw err;
        }
    }


    async function updateUser({
        dbName,
        name,
        id
    }){
        try{
            await db.query(`UPDATE ${dbName}.users SET Name=? WHERE id=?`, [name, id]);
            return true;
        }
        catch(err){
            throw err;
        }
    }

    async function deleteUser({id, dbName}){
        try{
            await db.query(`DELETE FROM ${dbName}.users WHERE id=?`, [id]);
            return true;
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = makeUserDbMethods;