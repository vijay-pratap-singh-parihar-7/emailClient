module.exports = function makeUpdateUserUseCase({
    Joi,
    updateUserDb
})
{
    return async function updateUserUseCase({name, id, dbName}){
        const value = validateUserName({name, id});
        const result =  await updateUserDb({name: value.name , id: value.id, dbName});
        return result;
    }
    function validateUserName({
        name,
        id
    }){
        const schema = Joi.object({
            id: Joi.number().required(),
            name: Joi.string().trim().required()
        });
        const { error, value } = schema.validate({
            name,
            id
        });

        if (error) {
            throw error;
        }
        return value;
    }
}