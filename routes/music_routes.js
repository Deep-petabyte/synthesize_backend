const router = require('express').Router()
const musicController = require("../controllers/music_controllers")

// Route to get all music

router.get('/musics/:page', musicController.getAllMusic)

// Route to request music

router.post('/music', musicController.getMusic)

module.exports = router