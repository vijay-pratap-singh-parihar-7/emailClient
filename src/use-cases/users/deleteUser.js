module.exports = function makeDeleteUserUseCase({
    Joi,
    deleteUserDb
}) {
    return async function deleteUserUseCase({id, dbName}) {
            const value = validateUserId({id})
            const result = await deleteUserDb({id: value.id,
            dbName});
            return result;
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
