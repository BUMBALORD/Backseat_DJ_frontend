
$(document).ready(function() {

  var upSkipVotes = new Firebase("https://backseatdj.firebaseIO.com/upSkipVotes");

  $("#up-skip").one("click", function(event){
    upSkipVotes.transaction(function (current_value) {
      return (current_value + 1);
    })
  })

  var downSkipVotes = new Firebase("https://backseatdj.firebaseIO.com/downSkipVotes");

  $("#down-skip").one("click", function(event){
    downSkipVotes.transaction(function (current_value) {
      return (current_value + 1);
    })
  })

  // var replayVotes = new Firebase("https://backseatdj.firebaseIO.com/replayVotes");

  // $("#replay").one("click", function(event){
  //   replayVotes.transaction(function (current_value) {
  //     return (current_value + 1);
  //   })
  // })




});
