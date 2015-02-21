var pg = require('pg');
var conString = "postgres://nernst@localhost:5432/citiparks";
//var conString = process.env.DATABASE_URL;

function fetchMenus(req, res) {
    console.log(conString);
    pg.connect(conString, function(err, client) {
        var query = "SELECT * FROM menus";
        //partial = partial + '%';
        var data = [];
        if (err) {
            console.log(err);
        }
        client.query(query, function(err, result) {
            if (err) {
                console.log(err);
            }
            //console.log(result);
            for (i = 0; i < result.rows.length; i++) {
                data.push(result.rows[i]);
            }
            json_fmt  = JSON.stringify(data);
            res.send(json_fmt);
        });
    });
}