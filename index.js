const express = require('express')
const app = express()
const fetch = require('node-fetch');
const port = 5000
//const bodyParser = require('body-parser')
const monk = require('monk')
const url = '';
var schedule = require('node-schedule');


//create a new date
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +" "+ today.getHours() +":"+today.getMinutes();
date = date.toString();


const db = monk(url);

//initialize variables for future 
let map = new Map ();
let streamList = [];


//function to create the map structure to be stored in mongo
function combineData(arr){


//iterate through array from twitch api and push object to an array
for (let i =0; i<arr.length; i++){
const stream = new Object()
stream.user_name = arr[i].user_name
stream.viewer_count = arr[i].viewer_count
stream.date = new Date ();
streamList.push(stream);

}


//set the map to current date as key and the array created as the value
map.set(date, streamList)

}

db.then(() => {
    console.log('Connected correctly to server')
  })
  //fetch twitch api every hour
  schedule.scheduleJob('0 * * * *',async function(){
    
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +" "+ today.getHours() +":"+today.getMinutes();
    date = date.toString();

    let arr = await fetch('https://api.twitch.tv/helix/streams/?first=100', {
      method: 'get',
      headers: {
          'Client-ID': ''
      }, 
  })
  .then(res => res.json())
  
  pagination=arr.pagination.cursor

for(let i = 0; i < arr.data.length; i++){
first100[i] = {user_name: arr.data[i].user_name, viewer_count: arr.data[i].viewer_count,date: date}
}

let arr2 = await fetch('https://api.twitch.tv/helix/streams/?first=100&after=' + pagination, {
    method: 'get',
    headers: {
        'Client-ID': ''
    }, 
})
.then(res => res.json())
for(let i = 0; i < arr2.data.length; i++){
    second100[i] = {user_name: arr2.data[i].user_name, viewer_count: arr2.data[i].viewer_count,date: date}
   }
let combine = first100.concat(second100);

combineData(combine);

collection.insert(map)
.then((docs) => {

}).catch((err) => {
// An error happened while inserting
}).then(() => db.close())
    });

  let collection = db.get('collection')
  let first100 = [];
  let second100 = [];
  let pagination;


  app.get('/update', async (req, res) => {
  })

app.get('/data', function (req, res) {
    console.log(collection.find({}).then((docs) => {}))
    res.send("get data")
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))