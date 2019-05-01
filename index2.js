const express = require('express')
const app = express()
const port = 5000
const monk = require('monk')
let arr = [];
const url = '';
const db = monk(url);


function combineData(arr){



}


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
   console.log(arr);



app.listen(port, () => console.log(Example app listening on port ${port}!))
