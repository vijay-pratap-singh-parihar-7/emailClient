module.exports = function makeCreateUserUseCase({
    Joi,
    usersDb
})
{
    return async function createUserUseCase({
        dbName,
        email,
        name,
        accessToken,
        refreshToken,
        password
    }){
        // try{
            // const allUsersDetails = await usersDb.getAllUsers();
            // await allUsersDetails.forEach(object => {
            //     if(object.Email == email){
            //         return "Already Exists";
            //     }
            // });
            console.log("use case")
            const value = validateUserData({
                email,
                name,
                accessToken,
                refreshToken,
                password
            })
            console.log("use case")
            const result = await usersDb.createUser({
                dbName,
                email: value.email,
                name: value.name,
                accessToken: value.accessToken,
                refreshToken: value.refreshToken,
                password: value.password
            });
            return result;
        // }
        // catch(err){
        //     console.log({err});
        //     // throw err;
        // }
    }
    function validateUserData({
        email,
        name,
        accessToken,
        refreshToken,
        password
    }) {
        const schema = Joi.object({
            name: Joi.string().trim().required(),
            email: Joi.string().email().required(),
            accessToken: Joi.string().required(),
            refreshToken: Joi.string().required(),
            password: Joi.string().required()
        });
        const { error, value } = schema.validate({
            email,
            name,
            accessToken,
            refreshToken,
            password
        });

        if (error) {
          throw error
        }
        return value;
    }
}