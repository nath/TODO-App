var express = require('express');
var router = express.Router();

var Task = require('../models/task');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

/* GET home page. */
router.get('/', function(req, res, next) {
  Task.find({}, function(err, t) {
    if (err) throw err;

    res.render('index', { title: 'TODO App', tasks: t});
  });
});

router.post('/add', function(req, res, next) {
  console.log(req.body);
  var newTask = Task({
    text: req.body.text,
    done: false
  });

  newTask.save(function(err) {
    if (err) throw err;
  });

  res.send(newTask);
});

router.post('/delete', function(req, res, next) {
  Task.remove({ _id: req.body.id }, function(err) {
    if (err) throw err;
  });
  
  res.send('Success');
});

router.post('/check', function(req, res, next) {
  Task.findOne({ _id: req.body.id }, function(err, task) {
    if (err) throw err;

    task.done = !task.done;

    task.save(function(err) {
      if (err) throw err;
    });

    res.send('Success');
  });
});

module.exports = router;
