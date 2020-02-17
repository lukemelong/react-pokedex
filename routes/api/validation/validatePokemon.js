const Joi = require('@hapi/joi')
const Pokemon = require('../../../models/pokemon')
// Validator
function validatePokemon(obj){

    const schema = Joi.object({
        "_id": Joi.number().required(),
        "name": Joi.string().min(3).max(30).required(),
        "img": Joi.string().min(4).max(200),
        "description": Joi.string().min(4).max(500),
        "seen": Joi.boolean(),
        "caught": Joi.boolean(),
        "stats": Joi.object({
            "HP": Joi.number(),//.required(),
            "Attack": Joi.number(),//.required(),
            "Defense": Joi.number(),//.required(),
            "Sp. Attack": Joi.number(),//.required(),
            "Sp. Defense": Joi.number(),//.required(),
            "Speed": Joi.number(),//.required(),
        }),//.required(),
        "evolution": Joi.object({
            "prev": Joi.number().min(1).max(1),
            "next": Joi.number().min(1).max(1),
        }),
        "moveset": Joi.array().items(Joi.string())
    })

    return schema.validate(obj)
}

// function idUnique(id){
//     const val = await Pokemon.exists({_id: id})
//     return val
// }

exports.validatePokemon = validatePokemon;
// exports.idUnique = idUnique;