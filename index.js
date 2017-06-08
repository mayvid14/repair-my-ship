var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var server = require('http').Server(app);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use('/nm',express.static(path.join(__dirname,'node_modules')))

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'public','views','main.html'));
})

app.listen(8080,function(){
    console.log('Connected to 8080');
});