const express = require('express')
const app = express()
const port = 5000
const monk = require('monk')

let arr = [];
const url = 'mongodb://mag:3VZsQPNVkZ8aIGSc@cluster0-shard-00-00-z1he2.mongodb.net:27017,cluster0-shard-00-01-z1he2.mongodb.net:27017,cluster0-shard-00-02-z1he2.mongodb.net:27017/twitch_users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const db = monk(url);

db.then(() => {
    console.log('Connected correctly to server')
  })
  
collection = db.get('5/3');


app.get('/',(req, res) =>{
    collection.find({}, {user_name: 'sodapoppin'}).then((docs) => {
      console.log(docs)
    })

    res.send("success")
  })


  //  console.log(arr);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
