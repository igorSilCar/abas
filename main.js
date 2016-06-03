var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/process_post', urlencodedParser, function (req, res) {

   
   response = {
       trm: req.body.terminal,
       ca:req.body.ca,
       cb:req.body.cb,
       cc:req.body.cc,
       cd:req.body.cd,
   };
   console.log(response);
   res.end(JSON.stringify(response));
   
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
