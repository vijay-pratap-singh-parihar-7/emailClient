module.exports = function makeDeleteEmailFolderUseCase({
    Joi,
    deleteEmailFolderDb
}) {
    return async function deleteEmailFolderUseCase({ folderId }) {
        const value = validateInput({ folderId });
        const result = await deleteEmailFolderDb({ folderId: value.folderId });
        return result;
    }

    function validateInput({ folderId }) {
        const schema = Joi.object({
            folderId: Joi.number().required()
        });
        const { error, value } = schema.validate({ folderId });

        if (error) {
            throw error
        } else {
            return value;
        }
    }
}