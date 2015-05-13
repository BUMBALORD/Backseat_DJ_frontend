

var setVotes = function(){

  var upSkipVotes = new Firebase("https://backseatdj.firebaseIO.com/votes/upSkipVotes");
  var downSkipVotes = new Firebase("https://backseatdj.firebaseIO.com/votes/downSkipVotes");

  // Reset Votes //
  console.log("Setting the votes")
  downSkipVotes.set(0)
  upSkipVotes.set(0)

  $("#up-skip").on("click", function(){
    upSkipVotes.transaction(function (current_value) {
      debugger;
      return (current_value + 1);
    })
  })

// Display Skip Song Vote Count //

  upSkipVotes.on("value", function(snapshot) {
    console.log(snapshot.val());
    $("#skip-count-up").html(snapshot.val())
  })

// Don't Skip Song //

  $("#down-skip").on("click", function(){
    downSkipVotes.transaction(function (current_value) {
      debugger;
      return (current_value + 1);
    })
  })

// Display Don't Skip Song Vote Count //

  downSkipVotes.on("value", function(snapshot) {
    console.log(snapshot.val());
    $("#skip-count-down").html(snapshot.val())
  })

  // Total Skip Votes //

  upSkipVotes.on("value", function(snapshot1) {
    upVotes = snapshot1.val()

    // Total Don't Skip Votes //

  })
  downSkipVotes.on("value", function(snapshot2) {
    downVotes = snapshot2.val()

    // Total Votes //

  })
  totalVotes = upVotes + downVotes
  $("#skip-count-total").html(totalVotes)
}



