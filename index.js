var express = require('express');
var app = express();
var db = require("./public/javascripts/get_data");

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/menus/json/all', function(req, res){
  db.fetchMenus(req, res); //Asynchronous!
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
