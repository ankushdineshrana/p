var express = require('express');
var app = express();
app.use(express.static(__dirname+'/source'));

app.get('/', function (req, res) {
    
    console.log("Got a GET request for the homepage");
    res.sendFile( __dirname + "\\source\\login.html" )
  
})

app.get('/getdata/:id', function (req, res) {
    
  console.log("Got a GET request for the homepage");
  console.log("Got a JSON request for the homepage with parameter");
  console.log(req.params.id);
  
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/';
  var data;
  MongoClient.connect(url, function(err,client) {
      var db=client.db('test');
      const collection=db.collection("dishes");
      
          collection.find({"name":"Annkush"}).toArray((err,docs)=>{
              data=docs;
              console.log((docs));
                res.send({"data":data})
          })
      
  }); 
 
 
 
})

app.post('/success', function (req, res) {
    
    console.log("Got a GET request for the homepage");
   res.sendFile( __dirname + "\\source\\success.html" )
   
 })


var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("dashboard app listening at http://%s:%s", host, port)
})