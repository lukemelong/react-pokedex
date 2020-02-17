const mongoose = require('mongoose');
const schema = mongoose.Schema;
require('mongoose-type-email')

let userSchema = new schema({
    firstName: {
        type: String,
        max: [100, 'First Name must be less than 100 characters'],
        required: [true, 'Must supply first name'],
    },
    lastName: {
        type: String,
        max: [100, 'Last name must be less than 100 characters'],
        required: [true, 'Must supply last name'],
    },
    email: {
        type: String, 
        required: [true, 'Must provide an email'],
        unique: true
    },
    password: {
        type: String,
        max: [255, 'Password must be below 255 characters'],
        required: [true, 'Must provide a password']
    }
})
        

module.exports = mongoose.model('User', userSchema, 'users')