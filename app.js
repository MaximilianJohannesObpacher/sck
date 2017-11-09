const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const sck_news = require('./controllers/sck_news');

mongoose.connect(config.database);

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sck_news', sck_news);

app.get('/', function(req,res){
    res.send("Invalid page");
});

app.listen(port, function(){
    console.log('Starting the server at port ${port}');
});
