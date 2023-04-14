module.exports = function makeCreateEmailFolderController({
    Joi,
    createEmailFolder
}){
    return async function createEmailFolderController(req, res){
        try{
            const value = validateEmailFolder({
                folderName: req.body.folderName,
                userId: req.params.userId,
                providerId: 1
            });
            await createEmailFolder({
                folderName: value.folderName,
                userId: value.userId,
                providerId: value.providerId
            });
            res.status(200).json({
                status: "Success",
            })
        }
        catch(err){
            res.status(400).json({
                status: "Failed",
                message: err
            })
        }
    }
    function validateEmailFolder({folderName, userId, providerId}) {
        const schema = Joi.object({
            folderName: Joi.string().trim().required(),
            userId: Joi.number().required(),
            providerId: Joi.number(),
        });
        const { error, value } = schema.validate({folderName, userId, providerId});
        
        if (error) {
            throw error;
        } else {
            return value;
        }
    }
}