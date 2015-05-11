
$(document).ready(function() {

  var skipVotes = new Firebase("https://backseatdj.firebaseIO.com/skipVotes");

  $("#skip").one("click", function(event){
    skipVotes.transaction(function (current_value) {
      return (current_value + 1);
    })
  })



  var replayVotes = new Firebase("https://backseatdj.firebaseIO.com/replayVotes");

  $("#replay").one("click", function(event){
    replayVotes.transaction(function (current_value) {
      return (current_value + 1);
    })
  })


  // skipVotes.on("value", function(snapshot) {
  //   var newPlaylist = snapshot.val();
  //   console.log(newPlaylist.skipVotes);
  //   // console.log("Genre: " + newPlaylist.genre);
  // })



});
