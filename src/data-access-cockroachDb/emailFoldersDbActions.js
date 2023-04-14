const tableName = 'emailFolder'
module.exports = function makeEmailFoldersDb({
    db,
}){
    return Object.freeze({
        getEmailFolders,
        createEmailFolder,
        updateEmailFolder,
        deleteEmailFolder
    })

    async function getEmailFolders(id){
        try{
            const [result] = await db.query(`SELECT * FROM ${tableName} WHERE UserId=?`, [id]);
            return result;
        }
        catch(err){
            throw err;
        }
    }


    async function createEmailFolder(folderDetails){
        try{
            const [result] = await db.query(`INSERT INTO ${tableName} (folderName,UserId,ProviderId) VALUES(?,?,?)`,[folderDetails.folderName, folderDetails.userId, folderDetails.providerId]);
            return result;
        }
        catch(err){
            throw err;
        }
    }

    async function updateEmailFolder(newEmailFolderDetails){
        try{
            await db.query(`UPDATE ${tableName} SET folderName=? WHERE id=?`, [newEmailFolderDetails.folderName, newEmailFolderDetails.folderId]);
            return true;
        }
        catch{
            throw err;
        }
    }


    async function deleteEmailFolder({folderId}){
        try{
            await db.query(`DELETE FROM ${tableName} WHERE id=?`, [folderId]);
            return true;
        }
        catch{
            throw err;
        }
    }

}