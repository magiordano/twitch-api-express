const express = require('express')
const app = express()
const port = 5000
const monk = require('monk')
const fetch = require('node-fetch');
const url = 'mongodb://mag:3VZsQPNVkZ8aIGSc@cluster0-shard-00-00-z1he2.mongodb.net:27017,cluster0-shard-00-01-z1he2.mongodb.net:27017,cluster0-shard-00-02-z1he2.mongodb.net:27017/twitch_users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const db = monk(url);

db.then(() => {
    console.log('Connected correctly to server')
  })
  
collection = db.get('finaltest');


function storeData(arr) {
  for (let i = 0; i < arr.data.length; i++) {
    collection.find({
      user_id: arr.data[i].user_id
    }).then((docs) => {
      if (docs.length !== 0) {
        collection.update({
          user_id: arr.data[i].user_id
        }, {
          $push: {
            data: {
              'viewer_count': arr.data[i].viewer_count,
              'title': arr.data[i].title,
              'date': timestamp
            }
          }
        })
    }
       else {
        let stream = new Object()
        stream.user_name = arr.data[i].user_name
        stream.user_id = arr.data[i].user_id
        stream.data = [{
          'viewer_count': arr.data[i].viewer_count,
          'title': arr.data[i].title,
          'date': timestamp
        }]
        collection.insert(stream)
      .then((docs) => {
        // docs contains the documents inserted with added **_id** fields
      }).catch((err) => {
        // An error happened while inserting
      }).then(() => db.close())

      }
    })
  }
}

app.get('/',async (req, res) =>{

  
 //await collection.find({user_id: '25236843'}).then((docs) => {
  await collection.find({"data.date": {"$lt": new Date(2019, 5, 5)}}).then((docs) => {
  //  await collection.find({"data.viewer_count": 48092}).then((docs) => {
      console.log(docs)
      res.send(docs)
    })

  
  })


  app.get('/test',async (req, res) =>{
    timestamp = new Date()
    
    let arr = await fetch('https://api.twitch.tv/helix/streams/?first=100', {
        method: 'get',
        headers: {
          'Client-ID': '7zkh4ut355tznqbv75vc1dsflxiu0v'
        },
      })
      .then(res => res.json())
  
    pagination = arr.pagination.cursor
  
    let arr2 = await fetch('https://api.twitch.tv/helix/streams/?first=100&after=' + pagination, {
        method: 'get',
        headers: {
          'Client-ID': '7zkh4ut355tznqbv75vc1dsflxiu0v'
        },
      })
      .then(res => res.json())
  
    storeData(arr);
    storeData(arr2);
     
     })



  //  console.log(arr);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
