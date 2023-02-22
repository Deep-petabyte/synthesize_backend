const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    played_musics: [ ObjectId ],
    recent_musics:[ ObjectId ]
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel