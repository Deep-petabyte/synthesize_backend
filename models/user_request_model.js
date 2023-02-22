const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types


const userRequestSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    createdAt:{
        type: Date,
        expires: '300s',
        default: Date.now
    }
})

const userRequestModel = mongoose.model("userrequest", userRequestSchema)

module.exports = userRequestModel