
SC.initialize({
  client_id: 'db17be73cc8a86e63b53a69839d67352'
});
   //    soundcloud.addEventListener('onPlayerReady', function(player, data) {
   //   player.api_play();
   // });
Track = function (trackId){
        var currentTrack = "";
        SC.initialize({
            client_id: 'db17be73cc8a86e63b53a69839d67352'
        });

        SC.stream("http://api.soundcloud.com/tracks/" + trackId,
          {onfinish: function(){
            this.play();
            // var sound = SC.stream("/tracks/293", function(sound){
            // console.log(sound.position);
            // })
            console.log('yay')
          }
        }

          , function(event){
          currentTrack = event;
        })
         this.pause = function() {
            currentTrack.pause();
        };

        this.stop = function() {
            currentTrack.stop();
        };

        this.play = function() {
            // currentTrack.play();
            currentTrack.play({
              // onfinish:repeat,
              onload: function() {
                if (this.readyState == 2) {
                  console.log("yoloswag404")
                  // Handle error PLAY SOMETHING
                  // repeat
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

  songs = [
          {"title":"Sad Trombone",
          "song_url":"https://soundcloud.com/sheckylovejoy/sad-trombone",
          "soundcloud_id":"18321000"},
          {"title":"AraabMUZIK - \"Beauty\"",
          "song_url":"https://soundcloud.com/selftitledmag/araabmuzik-beauty",
          "soundcloud_id":"79408289"}]

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
      })


$(document).ready(function() {
        var rotation = new Rotation(songs);
        var currentTrack = rotation.currentTrack();
        var currentPlayingTrack = new Track(currentTrack.soundcloud_id);

        $('#play').on('click', function(event){
            currentPlayingTrack.play();
            $('.trackTitle').html(currentTrack.title);
            $('#pause').show();
            $('#play').hide();
            // currentPlayingTrack.play({onfinish:console.log("yay")}
            // currentTrack = rotation.nextTrack();
            // currentPlayingTrack = new Track(currentTrack.soundcloud_id);
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
        // $('.playlist').append( "<p class='songs' ><a href=" + response[i].id + ">" +  response[i].title + "</a></p>")
        // } // for loop

        $('.playlist').append( "<p class='songs' id=" + response[i].stream_url + "><a href=" + response[i].id + ">" +  response[i].title + "</a></p>")}

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
      var stream_url = "https://api.soundcloud.com/tracks/"+track+"/stream"

        $.ajax({
          url: song.parent().parent().parent().find('.search_bar').attr('action'),
          method: "POST",
          dataType: 'json',
          data: {track_id: track,
                  title: track_name,
                  playlist_id: playlid,
                  song_url: stream_url,
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






