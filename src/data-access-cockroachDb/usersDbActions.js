function makeUserDbMethods({ db }) {
    return Object.freeze({
        getAllUsers,
        createUser,
        updateUser,
        deleteUser
    })
    async function getAllUsers({ dbName }) {
        try {
            const { rows } = await db.query(`SELECT * FROM ${dbName}.users`);
            return rows;
        } catch (err) {
            console.error(`Error getting all users: ${err}`);
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
    }) {
        try {
            console.log("ododo")
            const { rowCount } = await db.query(
                `INSERT into ${dbName}.users ("Name", "Email", "accessToken", "RefreshToken", "Password") VALUES(?,?,?,?,?)`,
                [name, email, accessToken, refreshToken, password]
            );
            return rowCount;
        } catch (err) {
            console.error(`Error creating user: ${err}`);
            throw err;
        }
    }

    async function updateUser({ dbName, name, id }) {
        try {
            const { rowCount } = await db.query(
                `UPDATE ${dbName}.users SET Name=$1 WHERE id=$2`,
                [name, id]
            );
            return rowCount > 0;
        } catch (err) {
            console.error(`Error updating user: ${err}`);
            throw err;
        }
    }

    async function deleteUser({ id, dbName }) {
        try {
            const { rowCount } = await db.query(
                `DELETE FROM ${dbName}.users WHERE id=$1`,
                [id]
            );
            return rowCount > 0;
        } catch (err) {
            console.error(`Error deleting user: ${err}`);
            throw err;
        }
    }
}

module.exports = makeUserDbMethods;