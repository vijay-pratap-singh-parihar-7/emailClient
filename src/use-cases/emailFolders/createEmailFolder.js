module.exports = function makeCreateEmailFolderUseCase({
    Joi,
    createEmailFolderDb
}) {
    return async function createEmailFolderUseCase({ folderName, userId, providerId }) {
        const value = validateEmailFolder({ folderName, userId, providerId });
        const result=await createEmailFolderDb({ folderName: value.folderName, userId: value.userId, providerId: value.providerId });
        return result;
    }
    function validateEmailFolder({ folderName, userId, providerId }) {
        const schema = Joi.object({
            folderName: Joi.string().trim().required(),
            userId: Joi.number().required(),
            providerId: Joi.number(),
        });
        const { error, value } = schema.validate({ folderName, userId, providerId });

        if (error) {
            throw error;
        }else{
            return value;
        }
    }
}