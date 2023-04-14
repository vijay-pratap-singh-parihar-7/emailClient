module.exports = function makeGetEmailFoldersUseCase({
    getEmailFoldersDb
}){
    return async function getEmailFolders(id){
        try{
            return await getEmailFoldersDb(id);
        }
        catch{
            throw err;
        }
    }
}