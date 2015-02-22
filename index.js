var express = require('express');
var app = express();
var db = require("./public/javascripts/get_data");
var pg = require('pg');
//var conString = "postgres://nernst@localhost/citiparks";
var conString = process.env.DATABASE_URL;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('./public/index.html', { root: __dirname });
});

// Menus routes
app.get('/menus/json', function(req, res){
    res.sendFile('./public/menu.json' , { root: __dirname });
});

app.get('/menus/json/:id', function (req, res, next) {
    console.log('ID:', req.params.id);
    console.log(conString);
    pg.connect(conString, function(err, client, done) {
        client.query('SELECT items FROM menus WHERE id = $1', [req.params.id], function(err, result) {
        // handle an error from the query
        if (result.rows[0] != null) {
            console.log(result.rows[0].items);
        } else {
            done(client);
            res.statusCode = 404;
            res.send('An error occurred');
            return true;
        }
        res.statusCode = 200;//res.writeHead(200,{'content-type': 'text/plain'});
        res.send('Menu');

        done();
        });
    });
});

// Location Routes
app.get('/locations/json/:id', function (req, res, next) {
    console.log('ID:', req.params.id);
    console.log(conString);
    pg.connect(conString, function(err, client, done) {
        client.query('SELECT site_name FROM locations WHERE id = $1', [req.params.id], function(err, result) {
        // handle an error from the query
        if (result.rows[0] != null) {
            console.log(result.rows[0].site_name);
        } else {
            done(client);
            res.statusCode = 404;
            res.send('An error occurred');
            return true;
        }
        res.statusCode = 200;//res.writeHead(200,{'content-type': 'text/plain'});
        res.send('Location');
        done();
        });
    });
});

app.get('/locations/json', function(req,res) {
    res.sendFile('./public/locations.json', { root: __dirname }); //TODO this is static, not db generated.
});

//app.post('/locations/json/:id', ) // TODO allow for locations edits.

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

function fetchMenus(req, res) {
    console.log(conString);
    var data =
    json_fmt  = JSON.stringify(data);
    res.send(json_fmt);
}