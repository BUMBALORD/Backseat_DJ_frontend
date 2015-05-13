

var setVotes = function(){

  var upSkipVotes = new Firebase("https://backseatdj.firebaseIO.com/votes/upSkipVotes");
  var downSkipVotes = new Firebase("https://backseatdj.firebaseIO.com/votes/downSkipVotes");
  var totalVotes = new Firebase("https://backseatdj.firebaseIO.com/votes/totalVotes");
  // var upVotes = 0
  // var downVotes = 0
  // var totalVotes = 0
  // Reset Votes //
  console.log("Setting the votes")
  downSkipVotes.set(0)
  upSkipVotes.set(0)
  totalVotes.set(0)

    upSkipVotes.on("value", function(snapshot1) {
    upVotes = snapshot1.val()
  })

  downSkipVotes.on("value", function(snapshot2) {
    downVotes = snapshot2.val()
  })

  totalVotes.on("value", function(snapshot3) {
    votesTotal = snapshot3.val()
  })


  var totalListener = function(){
    // Total Skip Votes //
      if (votesTotal === 4) {
        if (downVotes > upVotes) {
          console.log('you win')
        }
        else {
          console.log('you lose')
        }
      }
      else {
        console.log('sad frog')
      }
  }

  $("#up-skip").on("click", function(){
    upSkipVotes.transaction(function (current_value) {
      // totalVotes++;
      console.log(votesTotal);
      totalListener();
      // upVotes ++;
      console.log('up')
      console.log(upVotes)
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
      // totalVotes ++;
      console.log(votesTotal);
      totalListener();
      // downVotes ++;
      console.log('down')
      console.log(downVotes)
      return (current_value + 1);
    })
  })

// Display Don't Skip Song Vote Count //

  downSkipVotes.on("value", function(snapshot) {
    console.log(snapshot.val());
    $("#skip-count-down").html(snapshot.val())
  })



}



