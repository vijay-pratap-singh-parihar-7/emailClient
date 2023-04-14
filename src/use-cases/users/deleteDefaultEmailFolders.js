module.exports = function makeDeleteDefaultEmailFoldersUseCase({
    emailFolderDb
}){
    return async function deleteDefaultEmailFolders(userId){
        const result = await emailFolderDb.getEmailFolders(userId);
        try{
            if(Array.isArray(result)){
                result.forEach(element => {
                    emailFolderDb.deleteEmailFolder(element.id);
                });
            }
        }
        catch(err){
            throw err;
        }
    }
}