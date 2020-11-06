"use strict";
exports.__esModule = true;
var routes_1 = require("./routes");
var express = require("express");
var Express = require("express").Express;
var mongoose = require("mongoose");
var cors = require("cors");
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 4004;
app.use(cors("*"));
app.use(routes_1["default"]);
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
console.log("uri", "" + process.env.URI);
// const DB_URL = `${process.env.URI}`
// const uri: string = DB_URL
var uri = "mongodb://localhost:27017/nodetsdb";
// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
var options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);
mongoose
    .connect(uri, options)
    .then(function () {
    return app.listen(PORT, function () {
        return console.log("Server running on http://localhost:" + PORT);
    });
})["catch"](function (error) {
    throw error;
});
