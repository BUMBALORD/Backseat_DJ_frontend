
// SC.initialize({
//   client_id: 'db17be73cc8a86e63b53a69839d67352'
// });
   //    soundcloud.addEventListener('onPlayerReady', function(player, data) {
   //   player.api_play();
   // });
// Track = function (trackId){
//         var currentTrack = "";
//         SC.initialize({
//             client_id: 'db17be73cc8a86e63b53a69839d67352'
//         });

//         // SC.stream("http://api.soundcloud.com/tracks/" + trackId,
//         //   {onfinish: function(){  }}
//         //   , function(sound){currentTrack = sound;})
//   SC.stream("http://api.soundcloud.com/tracks/" + trackId, {onfinish: function(){}}, function(sound){currentTrack = sound;});


//         this.pause = function() {
//             currentTrack.pause();
//         };

//         this.stop = function() {
//             currentTrack.stop();
//         };

//         this.play = function() {
//             // currentTrack.play();
//             currentTrack.play({
//               onload: function() {
//                 if (this.readyState == 2) {
//                   console.log('fuck')
//                 }
//                 debugger
//               }
//             });
//         };
// }

//  Rotation = function(tracks) {
//         var currentTrack = tracks[0];
//         this.currentTrack = function () {
//             return currentTrack;
//         };

//         this.nextTrack = function () {
//             var currentIndex = tracks.indexOf(currentTrack);
//             var nextTrackIndex = currentIndex + 1;
//             var nextTrackId = tracks[nextTrackIndex];
//             currentTrack = nextTrackId;
//             return currentTrack
//         };
//     };

//   songs = [
//           {"title":"Sad Trombone",
//           "song_url":"https://soundcloud.com/sheckylovejoy/sad-trombone",
//           "soundcloud_id":"18321000"},
//           {"title":"AraabMUZIK - \"Beauty\"",
//           "song_url":"https://soundcloud.com/selftitledmag/araabmuzik-beauty",
//           "soundcloud_id":"79408289"}]
//   // songs = []

// $.ajax({
//             url: "http://localhost:3000" + window.location.pathname + "/edit",
//             method: "GET",
//             dataType: 'json'
//         }).done(function(response){

//         for(var i=0;i<response.playlist.length;i++){
//             songs.push({"title": response.playlist[i].title,
//                         "song_url": response.playlist[i].song_url,
//                         "soundcloud_id": response.playlist[i].track_id.toString()
//                       })
// ////anchor
//             $('.current').append("<p id="+ response.playlist[i].track_id + ">"+response.playlist[i].title+"</p>");
//         };
//       })


$(document).ready(function() {
  Track = function (trackId){
        var currentTrack = "";
        SC.initialize({
            client_id: 'db17be73cc8a86e63b53a69839d67352'
        });

        // SC.stream("http://api.soundcloud.com/tracks/" + trackId,
        //   {onfinish: function(){  }}
        //   , function(sound){currentTrack = sound;})
 var asdf =  SC.stream("http://api.soundcloud.com/tracks/" + trackId, {onfinish: function(){debugger}}, function(sound){currentTrack = sound;});


        this.pause = function() {
            currentTrack.pause();
        };

        this.stop = function() {
            currentTrack.stop();
        };

        this.play = function() {
            // currentTrack.play();
            currentTrack.play({
              onload: function() {
                if (this.readyState == 2) {
                  console.log('fuck')
                }

              }
            });
        };
}

 Rotation = function(tracks) {
        var currentTrack = tracks[0];
        this.currentTrack = function () {
            return currentTrack;
        };

        this.nextTrack = function () {
            var currentIndex = tracks.indexOf(currentTrack);
            var nextTrackIndex = currentIndex + 1;
            var nextTrackId = tracks[nextTrackIndex];
            currentTrack = nextTrackId;
            return currentTrack
        };
    };

  // songs = [
  //         {"title":"Sad Trombone",
  //         "song_url":"https://soundcloud.com/sheckylovejoy/sad-trombone",
  //         "soundcloud_id":"18321000"},
  //         {"title":"AraabMUZIK - \"Beauty\"",
  //         "song_url":"https://soundcloud.com/selftitledmag/araabmuzik-beauty",
  //         "soundcloud_id":"79408289"}]
  songs = []
  var kevin = $.Deferred();
  kevin.done(
      $.ajax({
            url: "http://localhost:3000" + window.location.pathname + "/edit",
            method: "GET",
            dataType: 'json'
        }).done(function(response){

        for(var i=0;i<response.playlist.length;i++){
            songs.push({"title": response.playlist[i].title,
                        "song_url": response.playlist[i].song_url,
                        "soundcloud_id": response.playlist[i].track_id.toString()
                      })
////anchor
            $('.current').append("<p id="+ response.playlist[i].track_id + ">"+response.playlist[i].title+"</p>");
        };
      })).done(function(){
        var rotation = new Rotation(songs);
        var currentTrack = rotation.currentTrack();
        var currentPlayingTrack = new Track(currentTrack.soundcloud_id);
        debugger
      })




        $('#play').on('click', function(event){
          debugger
            currentPlayingTrack.play();
            $('.trackTitle').html(currentTrack.title);
            $('#pause').show();
            $('#play').hide();
        });


        $('#pause').on('click', function(event){
            currentPlayingTrack.pause();
            $('#pause').hide();
            $('#play').show();
        });

        $('#stop').on('click', function(event){
            currentPlayingTrack.stop();
            $('#pause').hide();
            $('#play').show();
        });

          $('#next').on('click', function(event){
            currentPlayingTrack.stop();
            currentTrack = rotation.nextTrack();
            currentPlayingTrack = new Track(currentTrack.soundcloud_id);
            currentPlayingTrack.play();
            $('.trackTitle').html(currentTrack.title);
        });

//           // $('.nonajax').append("<p>"+response.playlist[i].title+"</p>");
//           $('.current').append("<p>"+response.playlist[i].title+"</p>");
//           };
//         })

//   SC.stream("/tracks/87439426", function(sound){
//     var idx = 1
//     $('.macdre').on('click', function(event){
//       event.preventDefault();
//       idx+=1
//       if (idx % 2 === 0){
//         sound.start()
//       }
//       else{
//         sound.pause()
//         console.log(idx)}
//       })
//   });

      SC.stream("/tracks/69582332", function(sound){
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


  /////////////////////////////////   NO LONGER NEED THIS AJAX FOR PLAYLIST INDEX  ////////////////////////////////////////
  // $('.playlist-create').on('submit', function(event){
  //   event.preventDefault()
  //   var poo = "http://localhost:3000" + window.location.pathname
  //   $.ajax({
  //     url: poo,
  //     method: 'post',
  //     dataType: 'json',
  //     data: $(this).serialize()
  //   })
  //   .done(function(response){
  //   console.log("yes")


  // $('.playlist-create').on('submit', function(event){
  //   event.preventDefault()
  //   var poo = "http://localhost:3000" + window.location.pathname
  //   $.ajax({
  //     url: poo,
  //     method: 'post',
  //     dataType: 'json',
  //     data: $(this).serialize()
  //   })
  //   .done(function(response){
  //     console.log("yes")

    //   var car = $('.testes').last().clone()
    //   var bar = $(car).html("<a href=/users/"+ response.user_id+ "/playlists/" +response.id +">Name: " + response.name + ", Genre: " + response.genre+ "</a>")

    //   $('.testes').last().append(bar)
    // })

  //   var car = $('.testes').last().clone()
  //   var bar = $(car).html("<a href=/users/"+ response.user_id+ "/playlists/" +response.id +">Name: " + response.name + ", Genre: " + response.genre+ "</a>")

  //   $('.testes').last().append(bar)
  //   })


  // })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // $('.current').on("click", function(event){
  //     event.preventDefault();

  // });


// $('.playlist-index').ready(function(){
//   var poo = "http://localhost:3000" + window.location.pathname
//   $.ajax({
//     url: poo,
//     method: "get",
//     dataType: 'json',
//       // data: $(this).serialize()
//     })
//   .done(function(response){
//     $('h1').text( response.user.user_name + "'s Playlist ")
//     for (var i = 0; i < response.data.length; i++) {
//       var car = $('.testes').last().clone();
//       var bar = $(car).html("<a href=/users/"+ response.data[i].user_id+ "/playlists/" +response.data[i].id +">Name: " + response.data[i].name + ", Genre: " + response.data[i].genre+ "</a>")
//       $('.testes').last().append(bar)
//     }
//   })
// })


/////////////////////////////////   NO LONGER NEED THIS AJAX FOR PLAYLIST INDEX  ////////////////////////////////////////
  // $('.playlist-index').ready(function(){
  //   var poo = "http://localhost:3000" + window.location.pathname
  //   $.ajax({
  //     url: poo,
  //     method: "get",
  //     dataType: 'json',
  //     // data: $(this).serialize()
  //   })
  //   .done(function(response){
  //     $('h1').text( response.user.user_name + "'s Playlist ")
  //     for (var i = 0; i < response.data.length; i++) {
  //     var car = $('.testes').last().clone();
  //     var bar = $(car).html("<a href=/users/"+ response.data[i].user_id+ "/playlists/" +response.data[i].id +">Name: " + response.data[i].name + ", Genre: " + response.data[i].genre+ "</a>")
  //     $('.testes').last().append(bar)
  //   }
  //   })
  // })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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


        // $('.songs a').on("click", function(event){
        //   event.preventDefault();
        //   var song = $(this)
        //   var track = song.attr('href')
        //   var track_name = song.text();
        //   var abc = $('.play_songs').attr('action').length
        //   var bac = window.location.pathname.length
        //   var xyz = (window.location.pathname.charAt(bac - 2) + window.location.pathname.charAt(bac - 1))

        //   $.ajax({
        //     url: song.parent().parent().parent().find('.search_bar').attr('action'),
        //     method: "POST",
        //     dataType: 'json',
        //     data: {track_id: track,
        //       title: track_name,
        //       playlist_id: xyz,
        //       user_id: $('.play_songs').attr('action').charAt(abc -1) }
        //     }).done(function(response) {

        //       $('.current').append("<p>" + response.title + "</p>")
        //     })
        //   })

    $('.songs a').on("click", function(event){
      event.preventDefault();
      var song = $(this)
      var track = song.attr('href')
      var track_name = song.text();
      // var abc = $('.play_songs').attr('action').length
      // var bac = window.location.pathname.length
      // var xyz = (window.location.pathname.charAt(bac - 2) + window.location.pathname.charAt(bac - 1))
      var abc = $('.play_songs').attr('action').length
      var bac = window.location.pathname
      var playlid = /[^/]*$/.exec(bac)[0]
      var userid = bac.match('/.*/(.*)/.*/')[1]

        $.ajax({
          url: song.parent().parent().parent().find('.search_bar').attr('action'),
          method: "POST",
          dataType: 'json',
          data: {track_id: track,
                  title: track_name,
                  playlist_id: playlid,
                  user_id: userid }
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






