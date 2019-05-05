const express = require('express')
const app = express()
const fetch = require('node-fetch');
const port = 5000
//const bodyParser = require('body-parser')
const monk = require('monk')
const url = 'mongodb://mag:3VZsQPNVkZ8aIGSc@cluster0-shard-00-00-z1he2.mongodb.net:27017,cluster0-shard-00-01-z1he2.mongodb.net:27017,cluster0-shard-00-02-z1he2.mongodb.net:27017/twitch_users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
var schedule = require('node-schedule');

let pagination;

finalArr= [];
//create a new date
let today = new Date();
let date = today.getHours();
date = date.toString();
let today2 = new Date();
let date2 = today.getDay();
date2= date2.toString

const db = monk(url);
let collection = db.get('test')
//initialize variables for future 
let streamList = [];


//function to create the map structure to be stored in mongo
function storeData(arr){


//iterate through array from twitch api and push object to an array
for (let i =0; i<1; i++){
//query check if exists
let stream = new Object()
stream.user_name = arr[i].user_name
stream.user_id = arr[1].user_id
//stream.viewer_count = arr[i].viewer_count
stream.title = arr[i].title
stream.data = "{'viewer_count': " + arr[i].viewer_count + "}, {'title': " + arr[i].title + "}, {'date': " + new Date() + "}"
console.log("insert")
collection.insert(stream)
.then((docs) => {
  // docs contains the documents inserted with added **_id** fields
  // Inserted 3 documents into the document collection
}).catch((err) => {
  // An error happened while inserting
}).then(() => db.close())

}
//set the map to current date as key and the array created as the value

}

db.then(() => {
    console.log('Connected correctly to server')
  })


  //fetch twitch api every hour
  schedule.scheduleJob('0 * * * * *',async function(){
    
    let today = new Date();
    let date = today.getHours();
    date = date.toString();

    let arr = await fetch('https://api.twitch.tv/helix/streams/?first=100', {
      method: 'get',
      headers: {
          'Client-ID': '7zkh4ut355tznqbv75vc1dsflxiu0v'
      }, 
  })
  .then(res => res.json())
  
  pagination=arr.pagination.cursor

let arr2 = await fetch('https://api.twitch.tv/helix/streams/?first=100&after=' + pagination, {
    method: 'get',
    headers: {
        'Client-ID': '7zkh4ut355tznqbv75vc1dsflxiu0v'
    }, 
})
.then(res => res.json())

storeData(arr);
storeData(arr2);
    });



  app.get('/update', async (req, res) => {
  })

app.get('/data', function (req, res) {
    console.log(collection.find({}).then((docs) => {}))
    res.send("get data")
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))