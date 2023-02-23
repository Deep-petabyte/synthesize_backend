const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 5000
const cors = require("cors")  
// var request = require('request'); // "Request" library

// var client_id = ''; // Your client id
// var client_secret = ''; // Your secret

const MONGODB_URI = 'mongodb+srv://kiisifelix:kiisifelix2006@petabyte-music.mcjqbdm.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI).then(()=> console.log("connected")).catch(error=>console.log(error))

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
app.use(cors())
app.use(express.json())
app.use(require("./routes/music_routes"))
app.use(require("./routes/user_route"))


app.get('/', (req, res)=>{
  res.send("Welcome")
})






app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`))