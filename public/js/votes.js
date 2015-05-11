var buttons = function(){
  $('.upskip').one("click", function(event){
    event.preventDefault();
    // debugger
    var path = window.location.pathname
    $.ajax({
      url: 'http://localhost:3000' + path +'/upskip',
      type: "GET"
    })
    .done({

    })
  })

  $('.downskip').one("click", function(event){
    event.preventDefault();
    // debugger
    var path = window.location.pathname
    $.ajax({
      url: 'http://localhost:3000' + path +'/downskip',
      type: "GET"
    })
    .done({

    })
  })

  $('.upreplay').one("click", function(event){
    event.preventDefault();
    // debugger
    var path = window.location.pathname
    $.ajax({
      url: 'http://localhost:3000' + path +'/upreplay',
      type: "GET"
    })
    .done({

    })
  })

  $('.downreplay').one("click", function(event){
    event.preventDefault();
    // debugger
    var path = window.location.pathname
    $.ajax({
      url: 'http://localhost:3000' + path +'/downreplay',
      type: "GET"
    })
    .done({

    })
  })
}

$(document).ready(function(){
buttons();
})
