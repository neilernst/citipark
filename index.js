var express = require('express');
var app = express();
var db = require("./public/javascripts/get_data");
var pg = require('pg');
var conString = "postgres://nernst@localhost/citiparks";
//var conString = process.env.DATABASE_URL;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/locations/json/all', function(req,res) {
    res.sendFile('./public/locations.json', { root: __dirname }); //TODO this is static, not db generated.
});

app.get('/menus/json/all', function(req, res){
    res.sendFile('./public/menu.json', , { root: __dirname });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

function fetchMenus(req, res) {
    console.log(conString);
    var data =
    json_fmt  = JSON.stringify(data);
    res.send(json_fmt);
}