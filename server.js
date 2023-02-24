const express = require("express")
const mongoose = require("mongoose")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const socketio = require('socket.io')
const http = require('http').createServer(app)
const PORT = 5000
const cors = require("cors")  
const MusicModel = require("./models/music_model")
// var request = require('request'); // "Request" library

// var client_id = ''; // Your client id
// var client_secret = ''; // Your secret


mongoose.connect(process.env.MONGODB_URI).then(()=> console.log("connected")).catch(error=>console.log(error))

// your application requests authorization
// var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//       'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//     },
//     form: {
//       grant_type: 'client_credentials'
//     },
//     json: true
//   };

// Uploading music to data base 

// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {

//     // use the access token to access the Spotify Web API
//     var token = body.access_token;
//     var options = {
//       url: 'https://api.spotify.com/v1/search?query=kayode&type=track&offset=0&limit=20',
//       headers: {
//         'Authorization': 'Bearer ' + token
//       },
//       json: true
//     };
//     request.get(options, function(error, response, body) {
//       body.tracks.items.forEach(async (item) => {
//         data.push(
//           {
//             name: item.name,
//             preview_url: item.preview_url,
//             image_url: item.album.images[0].url
//           }
//         )
//         await MusicModel.create({name: item.name, preview_url: item.preview_url, image_url: item.album.images[0].url})

//       })
//     });
//   }
// });
const corsOption = {
  origin: 'https://synthesizedj.netlify.app'
}
app.use(cors(corsOption))
app.use(express.json())
const io = socketio(http, {cors: corsOption})

app.use(require("./routes/music_routes"))
app.use(require("./routes/user_route"))

io.on('connection', (socket) =>{
  console.log(socket.id)

  socket.on('musicId-to-dj', musicId =>{
    MusicModel.findOne({_id: musicId})
    .then(result =>{
      io.emit('requested-musicId', result)
    })
  })
})

app.get('/', (req, res) =>{
  res.send("Welcome")
})

http.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`))