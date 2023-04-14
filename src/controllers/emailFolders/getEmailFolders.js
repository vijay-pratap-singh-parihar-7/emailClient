module.exports = function makeGetAllFoldersController({
    getEmailFolders
}){
    return async function getEmailFoldersController(req, res){
        const Id = req.params.userId;
        try{
            const result = await getEmailFolders(Id);
            res.status(201).send(result);
        }
        catch(err){
            res.status(400).json({
                status: "Failed",
                message: `${err}`
            })
        }
    }
}