// function mainMouseDownOne() {
//     $(".main").one('mousedown', '.resizeBar', function (e) { /* my code */ });
// }

// $(document).ready(function(){
//     mainMouseDownOne();

//     .ajax({
//         ...
//         success: function() {
//             ...
//             mainMouseDownOne();
//         }
//     })
// });


$(document).ready(function() {

// Up Vote! //

  var upSkipVotes = new Firebase("https://backseatdj.firebaseIO.com/votes/upSkipVotes");

  var upVote = function() {
    $("#up-skip").one("click", function(event){
      upSkipVotes.transaction(function (current_value) {
        return (current_value + 1);
      })
    })
  }

  upVote();

  upSkipVotes.on("value", function(snapshot) {
    console.log(snapshot.val());
    $("#skip-count-up").html(snapshot.val())
  })

// Down Vote! //

  var downSkipVotes = new Firebase("https://backseatdj.firebaseIO.com/votes/downSkipVotes");

  var downVote = function() {
    $("#down-skip").one("click", function(event){
      downSkipVotes.transaction(function (current_value) {
        return (current_value + 1);
      })
    })
  }

  downVote();

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

        downSkipVotes.set(0)
        upSkipVotes.set(0)
        upVote();
        downVote();
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
