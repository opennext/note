// https://github.com/alsotang/node-lessons/tree/master/lesson1

var express = require('express');

var app = express();

app.get('/', (req, res)=>{
  res.send('Hello World');
})

app.listen(3000, ()=>{
  console.log('runing at port 3000')
})