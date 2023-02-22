const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types


const recentMusicRequestSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    musicId: {
        type: String,
        required: true,
    }
    ,
    createdAt:{
        type: Date,
        expires: '1800s',
        default: Date.now
    }
})

const recentMusicRequestModel = mongoose.model("recentmusicrequest", recentMusicRequestSchema)

module.exports = recentMusicRequestModel