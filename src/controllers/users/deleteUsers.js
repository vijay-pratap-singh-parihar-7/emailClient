module.exports = function makeDeleteUserController({
    Joi,
    deleteUser,
    deleteDefaultEmailFolders
}){
    return async function deleteUserController(req, res){
        try{
            const value = validateUserId({id:req.params.id});
            await deleteUser({id:value.id,
                dbName:req.headers['database']
            });
            // await deleteDefaultEmailFolders({id});
            res.status(201).json({
                status: "Success"
            })
        }
        catch(err){
            res.status(400).json({
                status: "Failed",
                message: {err}
            })
        } 
    }
    function validateUserId({id}){
        const schema = Joi.object({
            id: Joi.number().required(),
        });
        const {error, value} =schema.validate({id});

        if(error) {
            throw error;
        }
        return value;
    }
}