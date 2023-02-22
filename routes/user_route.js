const router = require('express').Router()
const userController = require("../controllers/user_controller")

router.post('/user', userController.fetchUser)



module.exports = router