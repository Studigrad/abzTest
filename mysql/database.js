const mysql = require('mysql');

var con = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user: "b8a87892982176",
    password: "8f0bedc4",
    database: "heroku_a49a48d266946cd"
  });
  /*
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
*/
  module.exports = con;
  