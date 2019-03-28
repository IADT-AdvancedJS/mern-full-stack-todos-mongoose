const mongoose = require('mongoose');

let Todo = new mongoose.Schema({
  todo_description: String,
  todo_responsible: String,
  todo_priority: String,
  todo_completed: Boolean
});

module.exports = mongoose.model('Todo', Todo);
