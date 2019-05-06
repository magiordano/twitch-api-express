const express = require('express')
const app = express()
const fetch = require('node-fetch');
const port = 5000
//const bodyParser = require('body-parser')
const monk = require('monk')
const url = 'mongodb://mag:3VZsQPNVkZ8aIGSc@cluster0-shard-00-00-z1he2.mongodb.net:27017,cluster0-shard-00-01-z1he2.mongodb.net:27017,cluster0-shard-00-02-z1he2.mongodb.net:27017/twitch_users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
var schedule = require('node-schedule');

let pagination;
let timestamp;
const db = monk(url);
let collection = db.get('collection')
//initialize variables for future 

//function to store twitch fetch to mongodb 
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

db.then(() => {
  console.log('Connected correctly to server')
})

//fetch twitch api every hour
schedule.scheduleJob('0 * * * *', async function () {

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
  console.log("Successfully updated " + timestamp)
});


app.get('/trends', async (req, res) => {

  res.send("trends")
})

app.get('/data', function (req, res) {
  console.log(collection.find({}).then((docs) => {}))
  res.send("get data")
})

app.listen(port, () => console.log(`Gathering data on port ${port}...`))