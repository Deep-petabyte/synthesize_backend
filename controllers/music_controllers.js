const MusicModel = require("../models/music_model")
const UserModel = require("../models/user_model")
const RecentMusicRequestModel = require("../models/recent_music_request_model")
const UserRequestModel = require("../models/user_request_model")

// Controller to get all music in the specified pages

module.exports.getAllMusic = async (req, res) => {
    let page = parseInt(req.params.page)
    // page should be a value like 1, 2, 3, 4
    let limit = 25

    let skip = (page - 1) * 25
    // get previous page offset

    const data = await MusicModel.find().skip(skip).limit(limit)
    res.status(200).json({ data: data })
}

// Controller to request music

module.exports.getMusic = async (req, res) => {

    try {
        const { userId } = req.body
        const { musicId } = req.body

        const currentUser = await UserModel.findOne({ _id: userId })

        // Each user can only request for music once every 5 minutes
        const user_request = await UserRequestModel.findOne({ _id: currentUser._id })

        if (user_request) {
            return res.status(429).json({ error: "Request for music once every 5 minutes" })
        }
        await UserRequestModel.create({ _id: currentUser._id })

        // User cannot request for a music already requested in the last 30 mins
        const recent_music_request = await RecentMusicRequestModel.findOne({ musicId: musicId, userId: currentUser._id })

        if (recent_music_request) {
            return res.status(429).json({ error: "Cannot request for a music already requested in the last 30 mins" })
        }

        await RecentMusicRequestModel.create({ musicId: musicId, userId: currentUser._id })

        const index = currentUser.played_musics.indexOf(musicId)
        if (index !== -1) {
            return res.status(400).json({ error: "DJ has already played this music!" })
        }

        // Push the music Id to the played_music array in other to mark the music as played
        currentUser.played_musics.push(musicId)
        // Save the document
        await currentUser.save()

        res.send(currentUser)
    } catch (error) {
        res.status(500).json({ error: "An error occurred!" })
        console.log(error)
    }
}