$(document).ready(function(){


//******************************ORIGINAL
  // playlistSongs = []
  // playlistlength = $('.playlist').children().length
  //   for(var i=0; i<playlistlength;i++){
  //     playlistSongs.push({
  //     "title":($('.' + i).find('.songlist').text()),
  //     "song_url":($('.' + i).find('.songurl').text()),
  //     "soundcloud_id":($('.' + i).find('.trackid').text())
  //     })
  //   }

//**************************************
    playlistSongs = []
    var bac = window.location.pathname
    var playlid = bac.match('/.*/(.*).*/')[1]
    var user_id = bac.match(/\/users\/(\d+)/)[1]
    $.ajax({
      url:"http://localhost:3000/users/"+user_id+ "/playlists/"+playlid+"/play",
      type:'GET',
      data:$(this).serialize(),
      async:false
    }).done(function(response){
      for(var i=0; i<response.length; i++){
        playlistSongs.push({
          "title":response[i].title,
          "song_url": response[i].song_url,
          "soundcloud_id": response[i].track_id.toString(),
          "artwork_url":response[i].artwork_url
        })
      }
    })

  showValue = function(newValue){
    document.getElementById("range").innerHTML=newValue;
  }

  Track = function (trackId){
    var currentTrack = "";

    SC.initialize({
      client_id: 'db17be73cc8a86e63b53a69839d67352'
    });

    SC.stream("http://api.soundcloud.com/tracks/" + trackId,{onfinish: function(){
      currentPlayingTrack.stop();
      currentTrack = rotation.nextTrack();
      currentPlayingTrack = new Track(currentTrack.soundcloud_id);
      currentPlayingTrack.play();
      $('.trackTitle').html(currentTrack.title);
      }
    }, function(sound){currentTrack = sound});


    // ***BETA SOUND FUNCTION TESTING**//
    this.volume = function(num){
      if (num >= 0 && num <= 100){

      currentTrack.setVolume(num)
      } else {
        currentTrack.setVolume(100)
      }
    }

    this.mute = function(){
      currentTrack.mute();
    }

    this.unmute = function(){
      currentTrack.unmute();
    }

    this.pause = function() {
      currentTrack.pause();
    };

    // ***BETA SOUND FUNCTION TESTING**//


    this.stop = function() {
      currentTrack.stop();
    };

    this.repeat = function(){
      currentTrack.pause()
      currentTrack.play({onfinish: function(){currentTrack.play()} })
    }

    this.play = function() {

      // var resetFirebase = new Firebase("https://backseatdj.firebaseIO.com/triggers/resetFirebase");
      // resetFirebase.set(true)
      // location.reload();
      currentTrack.play({
        onfinish: function(){
            firebase()
          $('.trackTitle').html(currentTrack.title);
          currentTrack = rotation.nextTrack()
          currentPlayingTrack = new Track(currentTrack.soundcloud_id)
          currentPlayingTrack.play()
          $('.trackTitle').html(currentTrack.title)
        },
        onload: function() {
          if (this.readyState == 2) {
            // rotation.nextTrack()
            currentTrack = rotation.nextTrack()
            currentPlayingTrack = new Track(currentTrack.soundcloud_id)
            currentPlayingTrack.play()
            $('.trackTitle').html(currentTrack.title)
          }
        },
      });
    };

  } //Track end

  Rotation = function(tracks) {

        var currentTrack = tracks[0];
        this.currentTrack = function () {
          // $('.player').find
          $('.current_picture').attr('src', currentTrack.artwork_url)
          return currentTrack;
        };

        //***** REPEAT FUNCTION ********
        // this.lastTrack = function(){
        // var currentIndex = tracks.indexOf(currentTrack);
        // var lastTrackIndex = currentIndex - 1
        // if (lastTrackIndex < 0){
        //     var lastTrackId = tracks[tracks.length];
        //     console.log(lastTrackIndex)
        //     currentTrack = lastTrackId;
        //     return currentTrack
        // }else{
        //     var lastTrackId = tracks[lastTrackIndex];
        //     console.log(lastTrackIndex)
        //     currentTrack = lastTrackId;
        //     return currentTrack
        //     }
        // }

        //***** REPEAT FUNCTION END********



        this.nextTrack = function () {
          var currentIndex = tracks.indexOf(currentTrack);
          var nextTrackIndex = currentIndex + 1;
          // var nextTrackIndex = currentIndex;
          if (nextTrackIndex === $('.playlist').children().length){
                  //ORIGINAL WAS NOT +1
          // if (nextTrackIndex === $('.playlist').children().length + 1){
            playlistlength = $('.playlist').children().length
              for(var i=0; i<playlistlength;i++){
                playlistSongs.push({
                "title":($('.' + i).find('.songlist').text()),
                "song_url":($('.' + i).find('.songurl').text()),
                "soundcloud_id":($('.' + i).find('.trackid').text())
                })
              }
            rotation = new Rotation(playlistSongs)
            currentTrack = rotation.currentTrack();
            currentPlayingTrack = new Track(currentTrack.soundcloud_id);
            currentPlayingTrack.play();
            $('.trackTitle').html(rotation.currentTrack().title);
            $('#pause').show();
            $('#play').hide();
          } else {
                console.log(nextTrackIndex)
                var nextTrackId = tracks[nextTrackIndex];
                console.log(nextTrackIndex)
                currentTrack = nextTrackId;
                return currentTrack
          }
        };

  }; //Rotation end

  rotation = new Rotation(playlistSongs);
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
      currentTrack = rotation.nextTrack();
      currentPlayingTrack = new Track(currentTrack.soundcloud_id);
      currentPlayingTrack.play();
      $('.trackTitle').html(rotation.currentTrack().title);
  });


  $('#repeat').on('click', function(event){
      currentPlayingTrack.repeat();
      $('.trackTitle').html(rotation.currentTrack().title);
      //OLD$('.trackTitle').html(currentTrack.title);
      // currentTrack = rotation.nextTrack();
      // currentPlayingTrack = new Track(currentTrack.soundcloud_id);
      // currentPlayingTrack.play();
  });

  // $('#vollume').on('change',function(event){
  //   currentPlayingTrack.volume($('#range')[0].innerHTML)
  //   console.log($('#range')[0].innerHTML)
  // })

  $('#volume').change(function(event){
    currentPlayingTrack.volume($('#range')[0].innerHTML)
    console.log($('#range')[0].innerHTML)
  })


})

function reload_js(src) {
  $('script[src="' + src + '"]').remove();
  $('<script>').attr('src', src).appendTo('head');
}
    reload_js('/js/firebase.js');



  var skipTrigger = new Firebase("https://backseatdj.firebaseIO.com/triggers/skipTrigger");

  skipTrigger.on("value", function(snapshot) {
    if (snapshot.val() === true){
      $('#next').trigger('click')
      skipTrigger.set(false)
      reload_js('/js/firebase.js');
    }
  })

  var replayTrigger = new Firebase("https://backseatdj.firebaseIO.com/triggers/replayTrigger");

  replayTrigger.on("value", function(snapshot) {
    if (snapshot.val() === true){
      $('#repeat').trigger('click')
      replayTrigger.set(false)
      reload_js('/js/firebase.js');
    }
  })


//   skipTrigger.on("value", function(snapshot) {
//     if (snapshot.val() === true){
//       $('#next').trigger('click')
//       skipTrigger.set(false)
//     }
  // })
