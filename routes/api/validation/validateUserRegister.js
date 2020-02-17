const Joi = require('@hapi/joi')

// Validator
function validateUser(obj){

    const schema = Joi.object({
        "firstName": Joi.string().max(100).required(),
        "lastName": Joi.string().max(100).required(),
        "email": Joi.string().email({minDomainSegments: 2}).required(),
        "password": Joi.string().max(255).required()
    })

    return schema.validate(obj)
}

function uniqueEmail(obj, email){
    
    return !(obj.find(user => user.email === email))
}

exports.validateUser = validateUser;
exports.uniqueEmail = uniqueEmail;