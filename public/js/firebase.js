
$(document).ready(function() {

  var counter = new Firebase("https://backseatdj.firebaseIO.com/votes/counter");
  counter.set(1)
  counter.on("value", function(snapshot) {
    console.log(snapshot.val());
    currentCount = snapshot.val()
  })

// Up Vote! //

  var upSkipVotes = new Firebase("https://backseatdj.firebaseIO.com/votes/upSkipVotes");

  // var upVote = function() {
    $("#up-skip").on("click", function(event){
      if(currentCount === 1){
        upSkipVotes.transaction(function (current_value) {
          return (current_value + 1);
        })
      }
      // counter.set(0)
      // $("#down-skip").hide()
    })
  // }

  // upVote();

  upSkipVotes.on("value", function(snapshot) {
    console.log(snapshot.val());
    $("#skip-count-up").html(snapshot.val())
  })

// Down Vote! //

  var downSkipVotes = new Firebase("https://backseatdj.firebaseIO.com/votes/downSkipVotes");

  // var downVote = function() {
    $("#down-skip").on("click", function(event){
      if (currentCount === 1){
        downSkipVotes.transaction(function (current_value) {
          return (current_value + 1);
        })
      }
      // counter.set(0)
      // $("#up-skip").hide()
    })
  // }

  // downVote();

  downSkipVotes.on("value", function(snapshot) {
    console.log(snapshot.val());
    $("#skip-count-down").html(snapshot.val())
  })

// Vote Total! //

  var voters = 5

  upSkipVotes.on("value", function(snapshot1) {
    upVotes = snapshot1.val()

    downSkipVotes.on("value", function(snapshot2) {
      downVotes = snapshot2.val()
      totalVotes = upVotes + downVotes
      $("#skip-count-total").html(totalVotes)

      if (totalVotes >= voters){

        if (upVotes > downVotes){
          //trigger skip song
        } else if (upVotes === downVotes){
          //trigger random song
        }
        // $("#up-skip").show()
        // $("#down-skip").show()
        downSkipVotes.set(0)
        upSkipVotes.set(0)
        // counter.set(1)
        // upVote();
        // downVote();
      }

    })
  })





// ART! //

  var art = new Firebase("https://backseatdj.firebaseIO.com/images");

  $("#art-button").on("click", function(event){
    art.set(
      {
        img: "https://40.media.tumblr.com/418ea4c78e283560ceafa9da889e1e20/tumblr_n1689e4PAE1swa88uo1_500.jpg"
      }
    )
  })

  art.on("value", function(snapshot) {
    imageUrl = snapshot.val()
    $("#art").html('<img src="'+imageUrl.img+'">')
  })

});
