$(function(){
  $('#submit').on('click', function(){
    var website = $('#url').val();
    $.ajax({
      type: 'POST',
      url: '/' + website
    });
  });
});
