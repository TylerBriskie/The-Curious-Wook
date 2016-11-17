$(document).ready(function(){


//   ====Slide Out Navbar===
$(".button-collapse").sideNav();
$(".card-action:a").click();


//  ====submit API requests====
$('#songSubmit').submit(function(event){
  event.preventDefault();
  var $songA = $('input[name=song_a]').val();
  var $songB = $('input[name=song_b]').val();
  var $songA_regex = $songA.replace(/\W+/g, '-').toLowerCase();
  var $songB_regex = $songB.replace(/\W+/g, '-').toLowerCase();
  $.get('https://galvanize-cors-proxy.herokuapp.com/http://phish.in/api/v1/songs/'+ $songA_regex, displaySongAInfo, "json");
  $.get('https://galvanize-cors-proxy.herokuapp.com/http://phish.in/api/v1/songs/'+ $songB_regex, displaySongBInfo, "json");
});

$('#venueSubmit').submit(function(event){
  event.preventDefault();
  var $venueA = $('input[name=venue_a]').val();
  var $venueB = $('input[name=venue_b]').val();
  var $venueA_regex = $venueA.replace(/\W+/g, '-').toLowerCase();
  var $venueB_regex = $venueB.replace(/\W+/g, '-').toLowerCase();
  $.get('https://galvanize-cors-proxy.herokuapp.com/http://phish.in/api/v1/venues/'+ $venueA_regex, displayVenueAInfo, "json");
  $.get('https://galvanize-cors-proxy.herokuapp.com/http://phish.in/api/v1/venues/'+ $venueB_regex, displayVenueBInfo, "json");
});

// autocomplete forms
$.ajax({
    async: false,
    url: 'https://galvanize-cors-proxy.herokuapp.com/http://phish.in/api/v1/songs.json?per_page=900',
    data: "",
    accepts:'application/json',
    dataType: 'json',
    success: function (songs) {
        for (var i = 0; i < songs.data.length; i++) {
            $('#songs').append('<option value="' +songs.data[i].title +'">');
        }
    }
})

$.ajax({
    async: false,
    url: 'https://galvanize-cors-proxy.herokuapp.com/http://phish.in/api/v1/venues.json?per_page=900',
    data: "",
    accepts:'application/json',
    dataType: 'json',
    success: function (venues) {
        for (var i = 0; i < venues.data.length; i++) {
            $('#venues').append('<option value="' +venues.data[i].name +'">');
        }
    }
});

$('#song_a').autocomplete({
    source: listOfSongs
});
$('#song_b').autocomplete({
    source: listOfSongs
});
//clear forms
$('#formCancel').click(function(){
  $('.song-a-details').slideUp(600);
  $('.song-b-details').slideUp(600);
  $('.venue-a-details').slideUp(600);;
  $('.venue-b-details').slideUp(600);;
  $("input[type=text], textarea").val('');
});


//    ====Song Info====
function displaySongAInfo(song){
  console.log(song);
  if (!song.data) {
    console.log('here');
    $('.song-a-details').html('');
    $('.song-a-details').append('<h5>Song Not Found</h5>');
    $('.song-a-details').append('<p>Check your spelling?</p>');
    $('.song-a-details').fadeIn(1600);
  } else {
    populateSong(song, 'a');
  }
};

function displaySongBInfo(song){
  if (!song.data) {
    $('.song-b-details').html('');
    $('.song-b-details').append('<h5>Song Not Found</h5>');
    $('.song-a-details').append('<p>Check your spelling?</p>');
    $('.song-b-details').fadeIn(1600);
  } else {
    populateSong(song, 'b');
  }
};

function populateSong(song, column){
  var details = {};
  var tracks = 0;
  tracks = song.data.tracks
  details.title= song.data.title;
  details.timesPlayed = song.data.tracks_count;
  details.debut = song.data.tracks[0].show_date;
  details.mostRecent = song.data.tracks[tracks.length-1].show_date;
  $('.song-'+column+'-details').html('');
  $('.song-'+column+'-details').append('<h4>' + details.title + '</h4>');
  $('.song-'+column+'-details').append('<hr>')
  $('.song-'+column+'-details').append('<h5>Times Played</h5>');
  $('.song-'+column+'-details').append('<p>' + details.timesPlayed + '</p>');
  $('.song-'+column+'-details').append('<h5>First Played</h5>');
  $('.song-'+column+'-details').append('<p>' + details.debut + '</p>');
  $('.song-'+column+'-details').append('<h5>Most Recently Played</h5>');
  $('.song-'+column+'-details').append('<p>' + details.mostRecent + '</p>');
  $('.song-'+column+'-details').append('<audio controls><source src="' + song.data.tracks[tracks.length-1].mp3 +'" type="audio/mpeg"></audio>');
  $('.song-'+column+'-details').fadeIn(1600);
  document.forms['song_'+column].reset();
};


//  ====Venue Info=====

function displayVenueAInfo(venue){
  if (venue.data === null) {
    $('.venue-a-details').html('');
    $('.venue-a-details').append('<h5>Venue Not Found</h5>');
    $('.venue-a-details').append('<p>Check your spelling?</p>');
    $('.venue-a-details').fadeIn(1600);
    $('.help').fadeIn(1600);
  } else {
    populateVenue(venue, 'a');

  }
};

function displayVenueBInfo(venue){
  if (venue.data === null) {
    $('.venue-b-details').html('');
    $('.venue-b-details').append('<h5>Venue Not Found</h5>');
    $('.venue-b-details').append('<p>Check your spelling?</p>');
    $('.venue-b-details').fadeIn(1600);
    $('.help').fadeIn(1600);
  } else {
    populateVenue(venue, 'b');
  }
};


function populateVenue(venue, column){
  var details = {};
  var showCount = venue.data.shows_count;
  details.name = venue.data.name;
  details.showCount = venue.data.shows_count;
  details.cityState = venue.data.location;
  details.firstShow = venue.data.show_dates[0];
  details.lastShow = venue.data.show_dates[showCount-1];
  $('.venue-'+column+'-details').html('');
  $('.venue-'+column+'-details').append('<h4>' + details.name + '</h4>');
  $('.venue-'+column+'-details').append('<hr>');
  $('.venue-'+column+'-details').append('<h5>Location</h5>');
  $('.venue-'+column+'-details').append('<p>' + details.cityState + '</p>');
  $('.venue-'+column+'-details').append('<h5>Number of Shows</h5>');
  $('.venue-'+column+'-details').append('<p>' + details.showCount + '</p>');
  $('.venue-'+column+'-details').append('<h5>First Show</h5>');
  $('.venue-'+column+'-details').append('<p>' + details.firstShow + '</p>');
  $('.venue-'+column+'-details').append('<h5>Most Recent Show</h5>');
  $('.venue-'+column+'-details').append('<p>' + details.lastShow + '</p>');
  $('.venue-'+column+'-details').fadeIn(1600);
  document.forms['venue_'+column].reset();
};
});
