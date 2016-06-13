var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'pug');
var multichain = require("multichain-node")({
	port: 4790,
    host: '127.0.0.1',
    user: 'usr',
    pass: 'pss'
})

var notas = [
	'notaa',
	'notab',
	'notac',
	'notad'
];

var end;
var screendata = new Array();
var termaddrs = new Array({trm: '70000', adrs: '1A6CRty6vfYybQLfMtYYZeCYajUEyCQ2n9WJfU'});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)

})

var abasterm = function(adrs, type, value, term){
	multichain.issueMore({
		address: adrs,
		asset: type,
		qty: parseInt(value,10),
		details: {terminal: term}
	},(err, info) => {
		if (err){
			throw err;
		}
		console.log(info);
	})
}

var confabas = function(adrs, type, value, term){
	multichain.sendAssetTo({
		address: adrs,
		asset: type,
		qty: parseInt(value,10),
		details: {terminal: term}
	},(err, info) => {
		if (err){
			throw err;
		}
		console.log(info);
	})
}

var gettaddrs = function(term){
	for(i=0; i<termaddrs.length; i++){
		if (term===termaddrs[i].trm){
			return termaddrs[i].adrs;
		}
	}
	multichain.getNewAddress((err, info) => {
		if(err){
			console.log(err);
			throw err;
		}
		end = termaddrs[termaddrs.length] = {
			trm: term,
			adrs: info
		}
	})
	return termaddrs[termaddrs.length-1].adrs;
}

app.get('/', function (req, res) {
	res.render('add', '');
})

app.post('/', urlencodedParser, function (req, res) {
	var taa = req.body.addtaa.split(' ', 5);
	end = gettaddrs(taa[0]);
	for (i=0; i<taa.length-1; i++){
		abasterm(end, notas[i], taa[i+1], taa[0]);
	}
	screendata.push({
		term: taa[0],
		notaa: taa[1],
		notab: taa[2],
		notac: taa[3],
		notad: taa[4]
	})
	res.render('add', screendata[0]);
})

/* funcao legado
    multichain.issueMore({address: '13jzrMHbecGLKDbkofeehd7u1dVoxha3qzvDzb', asset: 'notaa', qty: parseInt(req.body.taa,10)},(err, info) => { 
        if(err){
            throw err;
        }
        console.log(info);
    })
  */ 
