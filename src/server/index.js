const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

// import Mongoose and the Todo model
const mongoose = require('mongoose');
const Todo = require('./models/Todo');


const server = express();
const dbname = 'MyTodos'; // change to match your database name

// serve files from the dist directory
server.use(express.static('dist'));

// URL to our DB - will be loaded from an env variable or will use local DB
const dbroute = process.env.MONGODB_URL || `mongodb://localhost:27017/${dbname}`;

let db;

mongoose.connect(dbroute, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});



// bodyParser, parses the request body to be a readable json format
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// define the various endpoints

// retrieve all user objects from DB
server.get('/api/todos', (req, res) => {
  Todo.find({}, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// retrieve user with specific ID from DB
server.get('/api/todos/:id', (req, res) => {
  Todo.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// delete user with specific ID from DB
server.delete('/api/todos', (req, res) => {
  Todo.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});

// create new user based on info supplied in request body
server.post('/api/todos', (req, res) => {
  const todo = new Todo(req.body);

  todo.save((err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.redirect('/');
  });
});

// update user based on info supplied in request body
server.put('/api/todos', (req, res) => {
  // get the ID of the user to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a user matching this ID and update their details
  Todo.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
