const express = require('express')
const app = express()
const port = 5000
const monk = require('monk')
const fetch = require('node-fetch');
const url = 'mongodb://mag:3VZsQPNVkZ8aIGSc@cluster0-shard-00-00-z1he2.mongodb.net:27017,cluster0-shard-00-01-z1he2.mongodb.net:27017,cluster0-shard-00-02-z1he2.mongodb.net:27017/twitch_users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

var schedule = require('node-schedule');


function getAverage(arr, newViews){
  let temp = arr.reduce((a,b)=> a+b)
  temp += newViews
  temp = Math.round(temp / (arr.length+ 1))
  console.log(temp)
}

 function storeData(arr) {
  for (let i = 0; i < arr.length; i++) {
    setTimeout(function(){
      //console.log(arr.length);
      collection.find({
        user_id: arr[i].user_id
      }).then((docs) => {
        if (docs.length !== 0) {
         console.log(docs);
          let newAverage = getAverage(docs[0].data.map((e) => e.viewer_count), arr[i].viewer_count)
      }

      })
    },i * 1000);
  }
}

app.get('/',async (req, res) =>{

  
 //await collection.find({user_id: '25236843'}).then((docs) => {
   collection.find({"data.date": {"$lt": new Date(2019, 5, 5)}}).then((docs) => {
  //  await collection.find({"data.viewer_count": 48092}).then((docs) => {
      console.log(docs)
      res.send(docs)
    })

  
  })


  schedule.scheduleJob('0 * * * * *', async function () {
    const db = monk(url);
    collection = db.get('collection');
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
      let combine = arr.data.concat(arr2.data)
      //combine both arr.data
    storeData(combine)
    
     })


  app.listen(port, () => console.log(`Gathering data on port ${port}...`))
