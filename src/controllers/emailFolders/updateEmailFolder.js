module.exports = function makeUpdateEmailFolderController({
    Joi,
    updateEmailFolder
})
{
    return async function updateEmailFolderController(req, res){
        try{

            validateUpdateEmailFolder({
                folderId: req.params.folderId,
                folderName: req.body.folderName
            });
            await updateEmailFolder({
                folderId: req.params.folderId,
                folderName: req.body.folderName
            });
            res.status(201).json({
                status: "Success"
            })
        }
        catch(err){
            res.status(400).json({
                status: "Failed"
            })
        }
    }
    function validateUpdateEmailFolder({folderId, folderName}){
        const schema = Joi.object({
            folderName: Joi.string().min(2).max(10).required(),
            folderId: Joi.number().required()
        });
        const { error, value } = schema.validate({folderId, folderName});
        
        if (error) {
            console.log('Validation error:', error);
        } else {
            console.log('Validation passed:', value);
        }
    }
}