/**
 * Created by Monique on 2015-03-28.
 */
var express = require("express");
var app = express();
var port = 3700;

app.get("/", function(req, res){
    res.send("It works!");
});

app.listen(port);
console.log("Listening on port " + port);