module.exports = function makeGetAllUserController({
    getAllUsers,
}){
    return async function getAllUsersController(req, res){
        try{
            const result = await getAllUsers({dbName:req.headers['database']});
            res.status(200).send(result);
        }
        catch(err){
            res.status(400).json({
                status: "Failed"
            });
        }
    }
} 