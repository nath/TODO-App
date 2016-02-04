var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  text: String,
  done: Boolean
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
