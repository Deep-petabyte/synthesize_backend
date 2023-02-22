const MusicModel = require("../models/music_model")
// Controller to get all music in the specified pages

module.exports.getAllMusic = async (req, res) =>{
    let page = parseInt(req.params.page)
    // page should be a value like 1, 2, 3, 4
    let limit = 25
  
    let skip = (page - 1) * 25
    // get previous page offset
  
    const data = await MusicModel.find().skip(skip).limit(limit)
    res.status(200).json({data: data})
}