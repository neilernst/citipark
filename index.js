var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();
// var db = require("./public/javascripts/get_data");
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

app.get('/menus/all', function(req,res) { //clone baby clone
    pg.connect(conString, function(err, client, done) {
        client.query('SELECT * FROM menus', function(err, result) {
        // handle an error from the query
        if (result.rows != null) {
            var json = JSON.stringify(result.rows);
            res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)});
            res.end(json);
        } else {
            done(client);
            res.statusCode = 404;
            res.send('An error occurred');
            return true;
        }
        });
    });
});

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/menus', urlencodedParser, function(req,res,next) {
    if (!req.body) return res.sendStatus(400)
    console.log('req:', req.body);
    pg.connect(conString, function(err, client, done) {
        if(req.body.mealclass == 'on') {
            var hot = true
        } else {
            var hot = false
        }
        client.query('INSERT INTO menus (meal_type,user_type,hot,service_date,items, comments) VALUES ($1, $2, $3, $4,$5,$6) RETURNING ID', [req.body.mealtype,1,hot,req.body.servicedate,req.body.items, req.body.comments],
            function(err, result) {
                if (err) {
                    console.log(err);
                    done(client);
                    res.redirect('/menu.html#failure');
                    res.status(500).end()
                    return true;
                } else {
                    console.log('row inserted with id: ' + result.rows[0].id);
                    res.redirect('/menu.html#success');
                    res.status(200).end();
                }
            });
        });

    });

app.delete('/menus/:id', function(req, res, next) {
});

app.get('/menus/json/:id', function (req, res, next) {
    console.log('ID:', req.params.id);
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

app.get('/locations/all', function(req,res) {
    //res.sendFile('./public/locations.json', { root: __dirname }); //TODO this is static, not db generated.
    pg.connect(conString, function(err, client, done) {
        client.query('SELECT * FROM locations', function(err, result) {
        // handle an error from the query
        if (result.rows != null) {
            var json = JSON.stringify(result.rows);
            res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)});
            res.end(json);
        } else {
            done(client);
            res.statusCode = 404;
            res.send('An error occurred');
            return true;
        }
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