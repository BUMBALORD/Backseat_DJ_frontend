function firebase() {

// var setVotes = function(){

  var numOfPlayers = 5;

  var upSkipVotes1 = new Firebase("https://backseatdj.firebaseIO.com/votes/upSkipVotes");
  var downSkipVotes1 = new Firebase("https://backseatdj.firebaseIO.com/votes/downSkipVotes");
  var totalVotes1 = new Firebase("https://backseatdj.firebaseIO.com/votes/totalVotes");

  // Reset Votes //
  console.log("Setting the votes")
  downSkipVotes1.set(0)
  upSkipVotes1.set(0)
  totalVotes1.set(0)


  upSkipVotes1.on("value", function(snapshot) {
    upSkipVotes2 = snapshot.val()
    console.log(snapshot.val());
    $("#skip-count-up").html(snapshot.val())
  })

  downSkipVotes1.on("value", function(snapshot) {
    downSkipVotes2 = snapshot.val()
    console.log(snapshot.val());
    $("#skip-count-down").html(snapshot.val())
  })

  totalVotes1.on("value", function(snapshot) {
    totalVotes2 = snapshot.val()
    console.log(snapshot.val());
    $("#skip-count-total").html(snapshot.val())
  })

  var ifEqual = function(){
    if(upSkipVotes2 === downSkipVotes2 && upSkipVotes2 != 0){
      console.log("Time up, random song")
      // trigger random song
    }
  }

  var idleTimer = function() {
    setTimeout(ifEqual, 7000);
  }



  var skip = function(){
    if (upSkipVotes2 >= Math.floor(numOfPlayers / 2) + 1){
      currentPlayingTrack.stop();
      //OLD$('.trackTitle').html(currentTrack.title);
      $('.trackTitle').html(rotation.currentTrack().title);
      currentTrack = rotation.nextTrack();
      currentPlayingTrack = new Track(currentTrack.soundcloud_id);
      currentPlayingTrack.play();
      console.log("skip the song")
    }
  }

  var repeat = function(){
    if (downSkipVotes2 >= Math.floor(numOfPlayers / 2) + 1){
      console.log("repeat the song")
      // replay song command
    }
  }

  var tie = function(){

    if (upSkipVotes2 === downSkipVotes2 && totalVotes2 === numOfPlayers){
      // trigger random song
      clearTimeout(idleTimer);
      console.log("random song")
    } else if (upSkipVotes2 === downSkipVotes2 && upSkipVotes2 != 0){
      idleTimer()
    }

  }

// Skip Song //

  $("#up-skip").on("click", function(){
    upSkipVotes1.transaction(function (current_value) {
      return (current_value + 1);
    })
    totalVotes1.transaction(function(current_value){
      return (current_value + 1);
    })
    skip()
    repeat()
    tie()
  })

// Repeat Song //

  $("#down-skip").on("click", function(){
    downSkipVotes1.transaction(function (current_value) {
      return (current_value + 1);
    })
    totalVotes1.transaction(function(current_value){
      return (current_value + 1);
    })
    skip()
    repeat()
    tie()

  })

}

$(document).ready(function() {
  firebase()
});
