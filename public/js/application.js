
// SC.initialize({
//   client_id: 'db17be73cc8a86e63b53a69839d67352'
// });
//       soundcloud.addEventListener('onPlayerReady', function(player, data) {
//      player.api_play();
//    });
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


  // var soundArray=songs
  //     SC.stream("http://api.soundcloud.com/tracks/" + songs[Math.random()*songs.length].soundcloud_id, {onfinish:
  //             function(sound){
  //               var index = soundArray.indexOf(sound);
  //               if (soundArray[index + 1] !== undefined) {
  //                     chain(soundArray[index + 1]);
  //               }
  //             }} )

        ///////////////////
      // linkt = songs[Math.random() * songs.length]
       // var sound = SC.stream("/tracks/"+linkt,
       //  function(soundy){
       //    sound.play();
       //  })
       // }

       //  function repeat(){
       //    var repeatSong=function(){
       //      this.play({onfinish:repeat});
       //  }

       //  var sound = SC.stream("/tracks/293", function(sound){sound.play({onfinish:repeatSong})
       //  })
       //  }
       ///////////////////
        // SC.stream("http://api.soundcloud.com/tracks/" + trackId,
        //   {onfinish: function(){  }}
        //   , function(sound){currentTrack = sound;})


  // soundArray=songs
  // SC.stream("http://api.soundcloud.com/tracks/"+trackId,
  //       {onfinish: function () {
  //       var index = soundArray.indexOf(sound);
  //       if (soundArray[index + 1] !== undefined) {
  //           chain(soundArray[index + 1]);
  //       }}}, function(sound){currentTrack=sound});



        SC.stream("http://api.soundcloud.com/tracks/" + trackId, {onfinish: function(){
            currentPlayingTrack.stop();
            currentTrack = rotation.nextTrack();
            currentPlayingTrack = new Track(currentTrack.soundcloud_id);
            currentPlayingTrack.play();
            $('.trackTitle').html(currentTrack.title);
        }}, function(sound){currentTrack = sound});

        this.pause = function() {
            currentTrack.pause();
        };

        this.stop = function() {
            currentTrack.stop();
        };

        this.play = function() {
            // currentTrack.play();

            currentTrack.play({
              onfinish: function(){
                $('.trackTitle').html(currentTrack.title);
                currentTrack = rotation.nextTrack()
                currentPlayingTrack = new Track(currentTrack.soundcloud_id)
                currentPlayingTrack.play()
                $('.trackTitle').html(currentTrack.title)

                alert('this shit done')
              },
              onload: function() {
                if (this.readyState == 2) {
                  console.log('fuck')

                  rotation.nextTrack()
                  currentTrack = rotation.nextTrack()
                  console.log(currentTrack)
                  currentPlayingTrack = new Track(currentTrack.soundcloud_id)
                  currentPlayingTrack.play()
                  $('.trackTitle').html(currentTrack.title)
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
  playlistlength = $('.playlist').children().length
  for(var i=0; i<playlistlength;i++){
    songs.push({
    "title":($('.' + i).find('.songlist').text()),
    "song_url":($('.' + i).find('.songurl').text()),
    "soundcloud_id":($('.' + i).find('.trackid').text())
    })
  }

    // ($('.' + i).find('.playlistid').text())



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
            $('.current').append("<p id="+ response.playlist[i].track_id + ">"+response.playlist[i].title+"</p>");
        };


      })



         rotation = new Rotation(songs);
         currentTrack = rotation.currentTrack();
         currentPlayingTrack = new Track(currentTrack.soundcloud_id);


        $('#play').on('click', function(event){
            currentPlayingTrack.play();
            $('.trackTitle').html(rotation.currentTrack().title);
            $('#pause').show();
            $('#play').hide();
        });


        $('#pause').on('click', function(event){
            currentPlayingTrack.pause();
            //OLD $('.trackTitle').html(currentTrack.title);
            $('.trackTitle').html(rotation.currentTrack().title);
            $('#pause').hide();
            $('#play').show();
        });

        $('#stop').on('click', function(event){
            currentPlayingTrack.stop();
            $('.trackTitle').html(rotation.currentTrack().title);
            $('#pause').hide();
            $('#play').show();
            //OLD$('.trackTitle').html(currentTrack.title);
        });

          $('#next').on('click', function(event){
            currentPlayingTrack.stop();
            //OLD$('.trackTitle').html(currentTrack.title);
            $('.trackTitle').html(rotation.currentTrack().title);
            currentTrack = rotation.nextTrack();
            currentPlayingTrack = new Track(currentTrack.soundcloud_id);
            currentPlayingTrack.play();
        });


  // $('.current').on("click", function(event){
  //     event.preventDefault();

  // });



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
        $('.playlist').append( "<p class='songs' id=" + response[i].stream_url + "><a href=" + response[i].id + ">" +  response[i].title + "</a></p>")}

    // $('.songs a').on("click", function(event){
    //   event.preventDefault();
    //   var song = $(this)
    //   var track = song.attr('href')
    //   var track_name = song.text();
    //   var abc = $('.play_songs').attr('action').length
    //   var bac = window.location.pathname
    //   var playlid = /[^/]*$/.exec(bac)[0]
    //   var userid = bac.match('/.*/(.*)/.*/')[1]
    //   var stream_url = "https://api.soundcloud.com/tracks/"+track+"/stream"
    //     $.ajax({
    //       url: song.parent().parent().parent().find('.search_bar').attr('action'),
    //       method: "POST",
    //       dataType: 'json',
    //       data: {track_id: track,
    //               title: track_name,
    //               playlist_id: playlid,
    //               song_url: stream_url,
    //               user_id: userid }
    //     }).done(function(response) {
    //       $('.current').append("<p>" + response.title + "</p>")
    //     })
    //   })

  }) // .done
  })  // search bar
});  // document






