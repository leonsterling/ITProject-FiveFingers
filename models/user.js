const mongoose = require('mongoose') // import mongoose
const bcrypt = require('bcryptjs') // import bycrypt

// schema for artefact
const artefactSchema = new mongoose.Schema({
    artefactName: {
        type: String, 
        required: [true, 'Artefact Name is Required']},
    category: {type: String},
    description: {type: String},
    memories: {type: String},
    associated: {type: String},
    location: {type: String},
    artefactDate :{type: Date},
    artefactImg : {
        imgURL: {type: String},
        publicID: {type: String}  
    }
 });

 // schema for user
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    artefactList: [artefactSchema]
 });

 // password comparison function
userSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}

// hash password before saving
userSchema.pre('save', function save(next) {
    const user = this // go to next if password field has not been modified
    if (!user.isModified('password')) {
        return next()
    }

    const SALT_FACTOR = 10
    // auto-generate salt/hash
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err)
        }
        //replace password with hash
        user.password = hash
        next()
    })
})

// constants to export as collections in DB to be used in userController
const User = mongoose.model('User', userSchema, "Users")
const Artefact = mongoose.model('Artefacts', artefactSchema, 'Artefacts')

// export the constants
module.exports = {User, Artefact}