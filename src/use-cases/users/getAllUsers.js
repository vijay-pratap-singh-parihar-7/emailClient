module.exports = function makeGetAllUsersUseCase({
    getAllUsersDb,
}){
    return async function getAllUserUseCase({dbName}){
        try{
            return await getAllUsersDb({dbName});
        }
        catch(err){
            throw err;
        }
    }
}