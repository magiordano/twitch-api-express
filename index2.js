const express = require('express')
const app = express()
const port = 5000
const monk = require('monk')
const fetch = require('node-fetch');
let arr = [];
const url = 'mongodb://mag:3VZsQPNVkZ8aIGSc@cluster0-shard-00-00-z1he2.mongodb.net:27017,cluster0-shard-00-01-z1he2.mongodb.net:27017,cluster0-shard-00-02-z1he2.mongodb.net:27017/twitch_users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const db = monk(url);

db.then(() => {
    console.log('Connected correctly to server')
  })
  
collection = db.get('collection');


app.get('/',async(req, res) =>{
  let arr = await fetch('https://api.twitch.tv/helix/streams/?first=100', {
    method: 'get',
    headers: {
        'Client-ID': '7zkh4ut355tznqbv75vc1dsflxiu0v'
    }, 
})
.then(res => res.json())
collection.insert(arr);
  })


  //  console.log(arr);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
