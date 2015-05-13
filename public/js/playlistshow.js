$(document).ready(function(){
  songs = []
  playlistlength = $('.playlist').children().length
    for(var i=0; i<playlistlength;i++){
      songs.push({
      "title":($('.' + i).find('.songlist').text()),
      "song_url":($('.' + i).find('.songurl').text()),
      "soundcloud_id":($('.' + i).find('.trackid').text())
      })
    }

    // firebase();

  Track = function (trackId){
    var currentTrack = "";
    SC.initialize({
        client_id: 'db17be73cc8a86e63b53a69839d67352'
    });

    SC.stream("http://api.soundcloud.com/tracks/" + trackId, {onfinish: function(){
      currentPlayingTrack.stop();
      currentTrack = rotation.nextTrack();
      currentPlayingTrack = new Track(currentTrack.soundcloud_id);
      currentPlayingTrack.play();
      $('.trackTitle').html(currentTrack.title);
      }
    }, function(sound){currentTrack = sound});

    this.pause = function() {
      currentTrack.pause();
    };

    this.stop = function() {
      currentTrack.stop();
    };

    this.play = function() {
      currentTrack.play({
        onfinish: function(){
          $('.trackTitle').html(currentTrack.title);
          currentTrack = rotation.nextTrack()
          currentPlayingTrack = new Track(currentTrack.soundcloud_id)
          currentPlayingTrack.play()
          $('.trackTitle').html(currentTrack.title)
        },
        onload: function() {
          if (this.readyState == 2) {
            firebase()
            rotation.nextTrack()
            currentTrack = rotation.nextTrack()
            currentPlayingTrack = new Track(currentTrack.soundcloud_id)
            currentPlayingTrack.play()
            $('.trackTitle').html(currentTrack.title)
          }
        }
      });
    };

  } //Track end

  Rotation = function(tracks) {
        var currentTrack = tracks[0];
        this.currentTrack = function () {
          return currentTrack;
        };

        this.nextTrack = function () {
          var currentIndex = tracks.indexOf(currentTrack);
          var nextTrackIndex = currentIndex + 1;
          if (nextTrackIndex === $('.playlist').children().length - 1){
            playlistlength = $('.playlist').children().length
              for(var i=0; i<playlistlength;i++){
                songs.push({
                "title":($('.' + i).find('.songlist').text()),
                "song_url":($('.' + i).find('.songurl').text()),
                "soundcloud_id":($('.' + i).find('.trackid').text())
                })
              }
            rotation = new Rotation(songs)
            currentTrack = rotation.currentTrack();
            currentPlayingTrack = new Track(currentTrack.soundcloud_id);
            currentPlayingTrack.play();
            $('.trackTitle').html(rotation.currentTrack().title);
            $('#pause').show();
            $('#play').hide();
          }
          console.log(nextTrackIndex)
          var nextTrackId = tracks[nextTrackIndex];
          currentTrack = nextTrackId;
          return currentTrack
        };
  }; //Rotation end

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

  NEXT = function(){
    currentPlayingTrack.stop();
      //OLD$('.trackTitle').html(currentTrack.title);
      $('.trackTitle').html(rotation.currentTrack().title);
      currentTrack = rotation.nextTrack();
      currentPlayingTrack = new Track(currentTrack.soundcloud_id);
      currentPlayingTrack.play();
  }



})

//   var numOfPlayers = 5;

//   var upSkipVotes1 = new Firebase("https://backseatdj.firebaseIO.com/votes/upSkipVotes");
//   var downSkipVotes1 = new Firebase("https://backseatdj.firebaseIO.com/votes/downSkipVotes");
//   var totalVotes1 = new Firebase("https://backseatdj.firebaseIO.com/votes/totalVotes");

//   // Reset Votes //
//   console.log("Setting the votes")
//   downSkipVotes1.set(0)
//   upSkipVotes1.set(0)
//   totalVotes1.set(0)


//   upSkipVotes1.on("value", function(snapshot) {
//     upSkipVotes2 = snapshot.val()
//     console.log(snapshot.val());
//     $("#skip-count-up").html(snapshot.val())
//   })

//   downSkipVotes1.on("value", function(snapshot) {
//     downSkipVotes2 = snapshot.val()
//     console.log(snapshot.val());
//     $("#skip-count-down").html(snapshot.val())
//   })

//   totalVotes1.on("value", function(snapshot) {
//     totalVotes2 = snapshot.val()
//     console.log(snapshot.val());
//     $("#skip-count-total").html(snapshot.val())
//   })

//   var ifEqual = function(){
//     if(upSkipVotes2 === downSkipVotes2 && upSkipVotes2 != 0){
//       console.log("Time up, random song")
//       // trigger random song
//     }
//   }

//   var idleTimer = function() {
//     setTimeout(ifEqual, 7000);
//   }

//   var skip = function(){
//     if (upSkipVotes2 >= Math.floor(numOfPlayers / 2) + 1){
//       NEXT()
//       console.log("skip the song")
//     }
//   }

//   var repeat = function(){
//     if (downSkipVotes2 >= Math.floor(numOfPlayers / 2) + 1){
//       console.log("repeat the song")
//       // replay song command
//     }
//   }

//   var tie = function(){

//     if (upSkipVotes2 === downSkipVotes2 && totalVotes2 === numOfPlayers){
//       // trigger random song
//       clearTimeout(idleTimer);
//       console.log("random song")
//     } else if (upSkipVotes2 === downSkipVotes2 && upSkipVotes2 != 0){
//       idleTimer()
//     }

//   }

// // Skip Song //

//   $("#up-skip").on("click", function(){
//     upSkipVotes1.transaction(function (current_value) {
//       return (current_value + 1);
//     })
//     totalVotes1.transaction(function(current_value){
//       return (current_value + 1);
//     })
//     skip()
//     repeat()
//     tie()
//   })

// // Repeat Song //

//   $("#down-skip").on("click", function(){
//     downSkipVotes1.transaction(function (current_value) {
//       return (current_value + 1);
//     })
//     totalVotes1.transaction(function(current_value){
//       return (current_value + 1);
//     })
//     skip()
//     repeat()
//     tie()

//   })


