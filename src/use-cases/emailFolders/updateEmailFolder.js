module.exports = function makeUpdateEmailFolderUseCase({
    Joi,
    updateEmailFolderDb
}) {
    return async function updateEmailFolderUseCase({ folderId, folderName }) {
        const values = validateUpdateEmailFolder({ folderId, folderName })
        const result = await updateEmailFolderDb({ folderId: values.folderId, folderName: values.folderName });
        return result;
    }
    function validateUpdateEmailFolder({ folderId, folderName }) {
        const schema = Joi.object({
            folderId: Joi.number().required(),
            folderName: Joi.string().trim().required()
        });
        const { error, value } = schema.validate({ folderId, folderName });

        if (error) {
            throw error;
        }
        return value;
    }
}