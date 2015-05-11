$(document).ready(function(){
  $(document).onLoad(function(event){
    event.preventDefault();
  $.ajax({
    url: "http://localhost:3000",
    method: 'get'
    dataType: 'json'
  })
  .done(function(response){
    console.log('yay')
  })
  .fail(function(response){
    console.log('fail')
  })

  })
})