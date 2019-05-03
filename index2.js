const express = require('express')
const app = express()
const port = 5000
const monk = require('monk')

let arr = [];
const url = '';
const db = monk(url);

let mapStructure = new Map();
let streamList = []


db.then(() => {
    console.log('Connected correctly to server')
  })
collection = db.get('collection');


app.get('/', (req, res) =>{
collection.find({}).then((docs) => {
  
    res.send("success")})
   })
  //  console.log(arr);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
