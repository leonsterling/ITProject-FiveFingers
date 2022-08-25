const mongoose = require('mongoose') // import mongoose

// schema for user
const tagSchema = new mongoose.Schema({
    name: {type: String}
 });

// schema for artefact
const artefactSchema = new mongoose.Schema({
    artefact_name: {type: String},
    artefact_description: {type: String},
    artefact_location: {type: String},
    artefact_date_created: {type: Date, default: new Date()},
    artefact_date_origin: {type: Date},
    artefact_image: {
        data: Buffer,
        contentType: String
    },
    artefact_tags: [tagSchema]
 });

 // schema for album
const albumSchema = new mongoose.Schema({
    name: {type: String},
    artefacts: [artefactSchema]
 });

 // schema for user
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    album_list: [albumSchema],
    artefact_list: [artefactSchema]
 });

// constants to export as collections in DB to be used in userController
const User = mongoose.model('User', userSchema)
const Artefact = mongoose.model('Artefact', artefactSchema)
const Album = mongoose.model('Album', albumSchema)
const Tag = mongoose.model('Tag', tagSchema)

// export the constants
module.exports = {User, Artefact, Album, Tag}
