
      SC.initialize({
        client_id: 'YOUR_CLIENT_ID'
      });
   //    soundcloud.addEventListener('onPlayerReady', function(player, data) {
   //   player.api_play();
   // });
$(document).ready(function() {

      $.ajax({
            url: "http://localhost:3000" + window.location.pathname + "/edit",
            method: "GET",
            dataType: 'json'
        }).done(function(response){
          for(var i=0;i<response.playlist.length;i++){

          $('.nonajax').append("<p>"+response.playlist[i].title+"</p>");
          };
        })




      SC.stream("/tracks/87439426", function(sound){
        var idx = 1
          $('.macdre').on('click', function(event){
                event.preventDefault();
                idx+=1
                if (idx % 2 === 0){
                sound.start()
                }
                else{
                  sound.pause()
                console.log(idx)}
              })
        });



  $('.playlist-create').on('submit', function(event){
    event.preventDefault()
    var poo = "http://localhost:3000" + window.location.pathname
    $.ajax({
      url: poo,
      method: 'post',
      dataType: 'json',
      data: $(this).serialize()
    })
    .done(function(response){
    console.log("yes")

    var car = $('.testes').last().clone()
    var bar = $(car).html("<a href=/users/"+ response.user_id+ "/playlists/" +response.id +">Name: " + response.name + ", Genre: " + response.genre+ "</a>")

    $('.testes').last().append(bar)
    })

  })

  // $('.current').on("click", function(event){
  //     event.preventDefault();

  // });

  $('.playlist-index').ready(function(){
    var poo = "http://localhost:3000" + window.location.pathname
    $.ajax({
      url: poo,
      method: "get",
      dataType: 'json',
      // data: $(this).serialize()
    })
    .done(function(response){
      $('h1').text( response.user.user_name + "'s Playlist ")
      for (var i = 0; i < response.data.length; i++) {
      var car = $('.testes').last().clone();
      var bar = $(car).html("<a href=/users/"+ response.data[i].user_id+ "/playlists/" +response.data[i].id +">Name: " + response.data[i].name + ", Genre: " + response.data[i].genre+ "</a>")
      $('.testes').last().append(bar)
    }
    })
  })


  // $('#new-user').on('submit', function(event){
  //   event.preventDefault();
  //   $.ajax({
  //     url: $(this).attr('action'),
  //     method: 'POST',
  //     data: $(this).serialize()
  //   }).done(function(response){

  //   })
  // })
  //AJAX DISABLED

  $('.search_bar').on("submit", function(event){
      $('.playlist').text("Playlist:")
      event.preventDefault();
      path = $(this).attr('action')
      $.ajax({
        url: path,
        method: 'get',
        data: $(this).serialize(),
        dataType: 'json'
      }).done(function(response){
        for(var i=0; i<response.length; i++){
        $('.playlist').append( "<p class='songs'><a href=" + response[i].id + ">" +  response[i].title + "</a></p>")
        } // for loop

    $('.songs a').on("click", function(event){
      event.preventDefault();
      var song = $(this)
      var track = song.attr('href')
      var track_name = song.text();
      var abc = $('.play_songs').attr('action').length
      var bac = window.location.pathname.length
      var xyz = (window.location.pathname.charAt(bac - 2) + window.location.pathname.charAt(bac - 1))

        $.ajax({
          url: song.parent().parent().parent().find('.search_bar').attr('action'),
          method: "POST",
          dataType: 'json',
          data: {track_id: track,
                  title: track_name,
                  playlist_id: xyz,
                  user_id: $('.play_songs').attr('action').charAt(abc -1) }
        }).done(function(response) {

          $('.current').append("<p>" + response.title + "</p>")
        })
      })
  }) // .done

    $('.play_songs').on("click", function(event){
        event.preventDefault();
    })





  })  // search bar






});  // document






