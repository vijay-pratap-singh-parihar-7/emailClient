module.exports = function makeCreateUserController({
    Joi,
    createUserUseCase,
    producer
}) {
    return async function createUserController(req, res) {
        try {
            const values = validateUserDetails({
                email: req.body.email,
                name: req.body.name,
                accessToken: req.body.accessToken,
                refreshToken: req.body.refreshToken,
                password: req.body.password
            });
            console.log(req.headers['database'],values.email,values.name,values.accessToken,values.refreshToken, createUserUseCase)
            const result = await createUserUseCase({
                dbName:req.headers['database'],
                email: values.email,
                name: values.name,
                accessToken: values.accessToken,
                refreshToken: values.refreshToken,
                password: values.password
            });
            // await createDefaultEmailFolders(result.insertId);
            console.log("Message Started...");
            await producer.connect();
            await producer.send({
                topic: 'first-topic',
                messages: [{
                    value:`${result.insertId}`
                   
                }]
            })
            console.log("Message Recieved...");
            await producer.disconnect();
            res.status(201).json({
                status: "Success"
            });
        }
        catch (err) {
            res.status(404).json({
                status: "Failed",
                message: err
            });
        }
    }
    function validateUserDetails({
        email,
        name,
        accessToken,
        refreshToken,
        password
    }) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().min(3).required(),
            accessToken: Joi.string().min(3).required(),
            refreshToken: Joi.string().min(3).required(),
            password: Joi.string().min(8).required()
        });
        const { error, value } = schema.validate({
            email,
            name,
            accessToken,
            refreshToken,
            password
        });

        if (error) {
            console.log('Validation error:', error);
        } else {
            console.log('Validation passed:', value);
        }
    }

}