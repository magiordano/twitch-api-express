const express = require('express')
const app = express()
const port = 5000
const monk = require('monk')

let arr = [];
const url = '';
const db = monk(url);

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    date = date.toString();
    
    let today2 = new Date();
    let date2 = today2.getHours;
    date2 = date2.toString();

    const stream = new Object()
  stream.user_name = 'test_user'
  stream.viewer_count = 1000
  stream.date = new Date();

  const stream2 = new Object()
  stream2.user_name = 'test_user2'
  stream2.viewer_count = 1001
  stream2.date = new Date();

let mapStructure = new Map();
let streamList = []
streamList.push(stream)
streamList.push(stream2)
//mapStructure.set ('user_name', 'maptest' )
//mapStructure.set ('list', stream)
mapStructure.set(date, streamList)
mapStructure.set('2019-5-3', streamList)



structure = {user_name: "test" , data: {[date]:{
hours: [[date2]]}
}
}


function initialize(arr){
  for (let i=0;i<arr.length;i++){
    initialData[i] = {user_name: arr[i].user_name, }
for(let x=1;x<=24;x++){
  let hour = "hour" + x
  initialData[i] = {data: {[hour]: {viewer_count: []} }
}
}
  }}


db.then(() => {
    console.log('Connected correctly to server')
  })
collection = db.get('collection');


app.get('/', (req, res) =>{
collection.find({}).then((docs) => {
    arr = docs
    combineData(arr);
    res.send(arr)})
   })
  //  console.log(arr);


  collection.insert(mapStructure)
  .then((docs) => {

  }).catch((err) => {
    // An error happened while inserting
  }).then(() => db.close())

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
