const router = require('express').Router()
const musicController = require("../controllers/music_controllers")


router.get('/musics/:page', musicController.getAllMusic)



module.exports = router