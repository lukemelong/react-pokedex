const mongoose = require('mongoose');
const schema = mongoose.Schema;

let pokemonSchema = new schema({
    _id: {
        type: Number,
        unique: true,
        required: [true, 'Must supply the pokemon pokedex number'],
        auto: false
    },
    name: {
        type: String,
        min: [3, "Name must be larger than 3 characters"],
        max: [30, "Name must be less than 30 characters"],
        required: [true, 'Must supply a pokemon name']
    },
    type_id: {
        type: Number,
        min: [1, "ID cannot be smaller than 1"],
        max: [15, "ID can not be larger than 15"],
        // required: true
    },
    stats: {
        "HP": {
            type: Number,
            min: [10, "HP cannot be lower than 10"],
            max: [1000, "HP cannot be greater than 1000"],
            // required: true
        },
        "Attack": {
            type: Number,
            min: [10, "Attack cannot be lower than 10"],
            max: [1000, "Attack cannot be greater than 1000"],
            // required: true
        },
        "Sp. Attack": {
            type: Number,
            min: [10, "Sp. Attack cannot be lower than 10"],
            max: [1000, "Sp. Attack cannot be greater than 1000"],
            // required: true
        },
        "Sp. Defense": {
            type: Number,
            min: [10, "Sp. Defense cannot be lower than 10"],
            max: [1000, "Sp. Defense cannot be greater than 1000"],
            // required: true
        },
        "Speed": {
            type: Number,
            min: [10, "Speed cannot be lower than 10"],
            max: [1000, "Speed cannot be greater than 1000"],
            // required: true
        },
    },
    evolution: {
        prev: {
            type: Number,
            min: [1, "Evolution must not be lower than 1"],
            max: [151, "Evolution cannot be greater than 155"],
            default: null
        },
        next: {
            type: Number,
            min: [1, "Evolution must not be lower than 1"],
            max: [151, "Evolution cannot be greater than 155"],
            default: null
        }
    },
    movset: [{
        type: Number,
        min: [1, "Moveset ID cannot be lower than 1"],
        max: [165, "Moveset ID cannot be greater than 165"],
        // required: true
    }],
    seen: {
        type: Boolean,
        default: false
    },
    caught: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        min: 4,
        max: 500,
        required: true
    }
})

module.exports = mongoose.model('Pokemon', pokemonSchema, 'pokemon')