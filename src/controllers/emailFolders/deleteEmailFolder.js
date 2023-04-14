module.exports = function makeDeleteEmailFolderController({
    Joi,
    deleteEmailFolder
}){
    return async function deleteEmailFolderController(req, res){
        try{
            const value = validateDeleteEmailFolder({folderId: req.params.folderId})
            console.log(value);
            await deleteEmailFolder({folderId: value.folderId});
            res.status(200).json({
                status: "Success"
            })
        }
        catch{
            res.status(400).json({
                status: "Failed"
            })
        }
    }
    function validateDeleteEmailFolder({folderId}){
        const schema = Joi.object({
            folderId: Joi.number().required()
        });
        const { error, value } = schema.validate({folderId});
        console.log("hemlo");
        if (error) {
            throw error
        }else{
            return value;
        }
    }
}