const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types


const recentMusicRequestSchema = new mongoose.Schema({
    musicId: {
        type: ObjectId,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
    ,
    createdAt:{
        type: Date,
        expires: '30m',
        default: Date.now
    }
})

const recentMusicRequestModel = mongoose.model("recentmusicrequest", recentMusicRequestSchema)

module.exports = recentMusicRequestModel