// install in package
//express mongoose cors bodyParser express-validator express-session axios bcryptjs

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/redit", {useMongoClient: true})
                  .then(function(){
                    console.log('MongoDB has connect');
                  }).catch( function(err){
                    console.log('There is error:' + err);
                  });

// Creat express server

const app = express();

// Define a static folder path
app.use(express.static( 'public'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Cross-origin resource sharing - Middelware
app.use(cors({
        origin:['http://localhost:3000'],
        methods:['GET','POST', 'DELETE', 'PUT'],
        credentials: true // enable set cookie
}));


//session Middelware
app.use(session({
    resave: true,
    secret: '*w!d$wA5PAa5CW6L',
    saveUninitialized:true,

}));


//Routes
app.use('/users', require('./controllers/users'));
// app.use('posts', require('./controllers/posts'));

//makeserver
const port = process.argv[2] || process.env.port || 3500;

app.listen(port, function(){
  console.log('we listing to' + port);
});
