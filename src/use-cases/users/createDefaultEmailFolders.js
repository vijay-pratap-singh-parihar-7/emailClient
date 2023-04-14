module.exports = function makeCreateDefaultEmailFolders({
    createEmailFoldersDb
}){
    return async function createDefaultEmailFolders(userId){
        try{
            const foldersName= ['Inbox', 'Sent', 'Archived', 'Outbox', 'Trash'];
            console.log("usecase", userId);
            foldersName.forEach(element=>{
                createEmailFoldersDb({
                    folderName: element,
                    userId: userId,
                    providerId: 1
                });
            })
            return;
        }
        catch(err){
            throw err;
        }
    }
}