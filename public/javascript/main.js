$(document).ready(function() {
  $('#tasks').on('change', '.checkbox input[type="checkbox"]', function() {
    $.post("/check/", { id: $(this).attr('id')});
  });

  $('#tasks').on('click', '.checkbox i', function() {
    var parent = $(this).parent();
    $.post("/delete/", { id: parent.children('input').attr('id')});
    parent.remove();
  });

  $('#createTask').click(function() {
    $('#tasksToAdd').append('<div class="newTask"><input type="text"><button class="addTaskButton">+</button></div>');
  });

  $('#tasksToAdd').on('click', '.addTaskButton', function() {
    var parent = $(this).parent();
    var t = parent.children('input').val();
    $.post("/add/", { text: t }, function(data) {
      $("#tasks").append('<div class="checkbox"><input type="checkbox" id="'+data._id+'"><label for="'+data._id+'"></label><span>'+data.text+'</span><i class="fa fa-times"></i></div>');
    });
    parent.remove();
  });
});
