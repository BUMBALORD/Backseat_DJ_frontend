$(document).ready(function() {
  // var firebase = function(){


var firebase = function(){

  var numOfPlayers = 5;

  var upSkipVotes1 = new Firebase("https://backseatdj.firebaseIO.com/votes/upSkipVotes");
  var downSkipVotes1 = new Firebase("https://backseatdj.firebaseIO.com/votes/downSkipVotes");
  var totalVotes1 = new Firebase("https://backseatdj.firebaseIO.com/votes/totalVotes");
  var userId = new Firebase("https://backseatdj.firebaseIO.com/playlist/userId");
  var playlistId = new Firebase("https://backseatdj.firebaseIO.com/playlist/playlistId");
  var skipTrigger = new Firebase("https://backseatdj.firebaseIO.com/triggers/skipTrigger");
  var replayTrigger = new Firebase("https://backseatdj.firebaseIO.com/triggers/replayTrigger");

  // Reset Votes //
  console.log("Setting the votes")

  upSkipVotes1.transaction(function (current_value) {
    return (0);
  })
  downSkipVotes1.transaction(function (current_value) {
    return (0);
  })
  totalVotes1.transaction(function (current_value) {
    return (0);
  })
  skipTrigger.transaction(function (current_value) {
    return (false);
  })
  replayTrigger.transaction(function (current_value) {
    return (false);
  })

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

// Controller Logic //

  var skip = function(){
    if (upSkipVotes2 >= Math.floor(numOfPlayers / 2) + 1){
      skipTrigger.set(true)
      console.log("skip the song")
    }
  }

  var repeat = function(){
    if (downSkipVotes2 >= Math.floor(numOfPlayers / 2) + 1){
      replayTrigger.set(true)
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

  firebase()

  // var resetFirebase = new Firebase("https://backseatdj.firebaseIO.com/triggers/resetFirebase");

  // resetFirebase.on("value", function(snapshot) {
  // if (snapshot.val() === true){
  //     firebase()
  //     resetFirebase.set(false)
  //   }
  // })

});
