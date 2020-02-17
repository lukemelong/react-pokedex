const Joi = require('@hapi/joi')

// Validator
function validateUserLogin(obj){

    const schema = Joi.object({
        "email": Joi.string().email({minDomainSegments: 2}).required(),
        "password": Joi.string().max(255).required()
    })

    return schema.validate(obj)
}

exports.validateUserLogin = validateUserLogin;