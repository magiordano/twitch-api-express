const express = require('express')
const app = express()
const fetch = require('node-fetch');
const port = 5000
//const bodyParser = require('body-parser')
const monk = require('monk')
const url = '';

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +" "+ today.getHours() +":"+today.getMinutes();
date = date.toString();
const db = monk(url);


console.log(date);
db.then(() => {
    console.log('Connected correctly to server')
  })
  const collection = db.get(date)
let first100 = [];
let second100 = [];
let pagination;


app.get('/', async (req, res) => {
    let arr = await fetch('https://api.twitch.tv/helix/streams/?first=100', {
            method: 'get',
            headers: {
                'Client-ID': ''
            }, //need to hide id later
        })
        .then(res => res.json())
        
        pagination=arr.pagination.cursor
      //  console.log('https://api.twitch.tv/helix/streams/?first=3&after=' + pagination);
    //.then(res.send(arr))
    
    //console.log(arr.data);
    for(let i = 0; i < arr.data.length; i++){
     first100[i] = {user_name: arr.data[i].user_name, viewer_count: arr.data[i].viewer_count,date: new Date()}
    }

    let arr2 = await fetch('https://api.twitch.tv/helix/streams/?first=100&after=' + pagination, {
            method: 'get',
            headers: {
                'Client-ID': ''
            }, //need to hide id later
        })
        .then(res => res.json())
        for(let i = 0; i < arr2.data.length; i++){
            second100[i] = {user_name: arr2.data[i].user_name, viewer_count: arr2.data[i].viewer_count,date: new Date()}
           }
    // console.log(first100);
    // console.log(second100);

    collection.insert(first100)
  .then((docs) => {

  }).catch((err) => {
    // An error happened while inserting
  }).then(() => db.close())

  
  collection.insert(second100)
  .then((docs) => {

  }).catch((err) => {
    // An error happened while inserting
  }).then(() => db.close())
    .then(res.send("success"))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))