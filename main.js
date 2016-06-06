var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multichain = require("multichain-node")({
    port: 4790,
    host: '127.0.0.1',
    user: 'usr',
    pass: 'pss'
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/public/" + "index.htm" );
})

app.post('/process_post', urlencodedParser, function (req, res) {

    multichain.issueMore({address: '13jzrMHbecGLKDbkofeehd7u1dVoxha3qzvDzb', asset: "notaa", qty: parseInt(req.body.taa,10)},(err, info) => { 
        if(err){
            throw err;
        }
        console.log(info);
    })
   
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)

})
