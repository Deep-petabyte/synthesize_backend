const mongoose = require("mongoose")

const musicSchema = new mongoose.Schema({
    name: String,
    preview_url: String,
    image_url: String
}, {timestamps: true})


const musicModel = mongoose.model("music", musicSchema)

module.exports = musicModel