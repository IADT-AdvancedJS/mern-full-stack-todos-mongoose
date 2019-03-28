# mern-full-stack-todos-mongoose

This is a modified version of the previous MERN Todo app example - https://github.com/IADT-AdvancedJS/mern-full-stack-todo. It has been modified to use [Mongoose](https://mongoosejs.com/) to provide object modeling for MongoDB.

There are three key changes.

## 1. Mongoose installation

Mongoose has been installed using `npm install --save mongoose`. (Note: this will be installed along with all the project dependencies when you run `npm install`).

## 2. `Todo` model has been added

This defines the properties all Todos have in the DB. This is in the `src/server/models/Todo.js` file.

```javascript
const mongoose = require('mongoose');

let Todo = new mongoose.Schema({
  todo_description: String,
  todo_responsible: String,
  todo_priority: String,
  todo_completed: Boolean
});

module.exports = mongoose.model('Todo', Todo);
```

## 3. Server code modified

The file `src/server/index.js` has been modified to use Mongoose and the Todo model to manipulate the database.

### Connect
```javascript
// import Mongoose and the Todo model
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
```

```javascript
// connect to the DB
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});
```

### Retrieve
```javascript
// retrieve all Todos from the DB
Todo.find({}, (err, result) => {
  if (err) throw err;

  console.log(result);
  res.send(result);
});
```

```javascript
// retrieve a Todo by _id
Todo.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
  if (err) throw err;

  console.log(result);
  res.send(result);
});
```

### Delete
```javascript
// delete a Todo by _id
Todo.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
  if (err) return res.send(err);

  console.log('deleted from database');
  return res.send({ success: true });
});
```

### Create
```javascript
// create a new Todo object using the Mongoose model and the data sent in the POST
const Todo = new Todo(req.body);
// save this object to the DB
Todo.save((err, result) => {
  if (err) throw err;

  console.log('created in database');
  res.redirect('/');
});
```
### Update
```javascript
// find a Todo matching this ID and update their details
Todo.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
  if (err) throw err;

  console.log('updated in database');
  return res.send({ success: true });
});
```
