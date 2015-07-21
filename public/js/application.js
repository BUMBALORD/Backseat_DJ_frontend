$(document).ready(function() {


  songs=[]
  $.ajax({
    url: "http://localhost:3000" + window.location.pathname + "/edit",
    method: "GET",
    dataType: 'json'
  }).done(function(response){
    for(var i=0;i<response.playlist.length;i++){
    // $('.current').append("<p id="+ response.playlist[i].track_id +">"+response.playlist[i].title+"</p>");
    $('.current').append("<p id="+ response.playlist[i].track_id + " class="+response.playlist[i].artwork_url+">"+response.playlist[i].title+"</p>");
    };
  })

  //keystroke
  $('.search_bar').on("submit", function(event){
    event.preventDefault();
    $('.playlist').text("Playlist:")
    path = $(this).attr('action')
    $.ajax({
      url: path,
      method: 'get',
      data: $(this).serialize(),
      dataType: 'json'
    }).done(function(response){
      for(var i=0; i<response.length; i++){
        // console.log(response[i].artwork_url)
        // $('.playlist').append( "<p class='songs' id=" + response[i].stream_url + "><a href=" + response[i].id + ">" +  response[i].title + "</a></p>")
        $('.playlist').append( "<p class='songs' id=" + response[i].stream_url + "><a class="+response[i].artwork_url+" href=" + response[i].id + ">" +  response[i].title + "</a></p>")
      }



    $('.songs a').on("click", function(event){
      event.preventDefault();
      var song = $(this)
      var track = song.attr('href')
      var artwork_url = song.attr('class')
      var track_name = song.text();
      var abc = $('.play_songs').attr('action').length
      var bac = window.location.pathname
      var playlid = /[^/]*$/.exec(bac)[0]
      var userid = bac.match('/.*/(.*)/.*/')[1]
      var stream_url = "https://api.soundcloud.com/tracks/"+track+"/stream"
        $.ajax({
          url: song.parent().parent().parent().find('.search_bar').attr('action'),
          method: "POST",
          dataType: 'json',
          data: {track_id: track,
                  title: track_name,
                  playlist_id: playlid,
                  artwork_url: artwork_url,
                  song_url: stream_url,
                  user_id: userid }
        }).done(function(response) {
      debugger
          $('.current').append("<p>" + response.title + "</p>")
        })
      })
    })  // search bar
 }) // .done

});  // document






