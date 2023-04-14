module.exports = function makeUpdateUserController({
    Joi,
    updateUser,
})
{
    return async function updateUserController(req, res){
        
        try{
            const values = validateUserName({
                name: req.body.name,
                id : req.params.id
            });
            await updateUser({
                dbName:req.headers['database'],
                name: values.name,
                id : values.id
            });
            res.status(201).json({
                status: "Updated Successfully!!"
            })
        }
        catch(err){
            res.status(400).json({
                status: "Failed",
                message: err
            })
        }
    }
    function validateUserName({
        name,
        id
    }){
        const schema = Joi.object({
            name: Joi.string().alphanum().min(3).required()
        });
        const { error, value } = schema.validate({
            name,
            id
        });

        if (error) {
            console.log('Validation error:', error);
        } else {
            console.log('Validation passed:', value);
        }
    }
}