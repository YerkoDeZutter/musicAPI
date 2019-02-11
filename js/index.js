$(document).keyup(function() {

  let artistCounter = 0;

  $.get("https://musicdemons.com/api/v1/artist", function(data) {

    if ($("input").is(":focus")) {

      $("#searchList ul").empty()
      $("#allSongs").empty()

      data.forEach(artist => {

        if (artist.name.toLowerCase().indexOf($("input").val().toLowerCase()) != -1) {

          $('<li />').attr({
            "class": "artistName",
            "id": artist.id
          }).text(artist.name).appendTo("#searchList ul");

          artistCounter++

        }

      })
    }

    if ($(".artistName").length == artistCounter) {
      $(".artistName").click(function() {
        let thisArtist = $(this).attr("id")

        $.get("https://musicdemons.com/api/v1/artist/" + thisArtist + "/songs", function(songData) {

          $("#searchList ul").empty()

          songData.forEach(song =>{

            $("<hr />").appendTo("#allSongs")

            $("<iframe />").attr({
              "width": 420,
              "height": 250,
              "src": "https://www.youtube.com/embed/" + song.youtube_id
            }).appendTo("#allSongs")

          })

        })

      })
    }

  })

})
