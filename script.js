$(document).ready(function(){

$(".button-collapse").sideNav();
$(".card-action:a").click();

$('#songSubmit').click(function(){
  var $songA = $('input[name=song_a]').val();
  var $songB = $('input[name=song_b]').val();
  var $songA_regex = $songA.replace(/\W+/g, '-').toLowerCase();
  var $songB_regex = $songB.replace(/\W+/g, '-').toLowerCase();
  $.get('http://phish.in/api/v1/songs/'+ $songA_regex, displaySongAInfo, "json");
  $.get('http://phish.in/api/v1/songs/'+ $songB_regex, displaySongBInfo, "json");
});

$('#venueSubmit').click(function(){
  var $venueA = $('input[name=venue_a]').val();
  var $venueB = $('input[name=venue_b]').val();
  var $venueA_regex = $venueA.replace(/\W+/g, '-').toLowerCase();
  var $venueB_regex = $venueB.replace(/\W+/g, '-').toLowerCase();
  $.get('http://phish.in/api/v1/venues/'+ $venueA_regex, displayVenueAInfo, "json");
  $.get('http://phish.in/api/v1/venues/'+ $venueB_regex, displayVenueBInfo, "json");
});

function displaySongAInfo(song){
  if (song.data === null) {
    $('.song-a-details').html('');
    $('.song-a-details').append('<h4>Song Not Found</h4>');
  } else {
  var details = {};
  var tracks = song.data.tracks
  details.timesPlayed = song.data.tracks_count;
  details.debut = song.data.tracks[0].show_date;
  details.mostRecent = song.data.tracks[tracks.length-1].show_date;
  // MATH FOR LONGEST GAP BELOW
  // for (var i = 1; i < tracks.length; i++) {
  //   var showGap = 0;
  //   if ((song.data.tracks[i].show_date - song.data.tracks[i-1].show_date)>showGap){
  //     showGap = song.data.tracks[i].show_date - song.data.tracks[i-1].show_date;
  //   };
  //   details.longestGap = showGap;
  // };

  $('.song-a-details').html('');
  $('.song-a-details').append('<h5>Times Played</h5>');
  $('.song-a-details').append('<p>' + details.timesPlayed + '</p>');
  $('.song-a-details').append('<h5>First Played</h5>');
  $('.song-a-details').append('<p>' + details.debut + '</p>');
  $('.song-a-details').append('<h5>Most Recently Played</h5>');
  $('.song-a-details').append('<p>' + details.mostRecent + '</p>');
}
};

function displaySongBInfo(song){
  if (song.data === null) {
    $('.song-b-details').html('');
    $('.song-b-details').append('<h4>Song Not Found</h4>');
  } else {
  var details = {};
  var tracks = song.data.tracks;
  details.timesPlayed = song.data.tracks_count;
  details.debut = song.data.tracks[0].show_date;
  details.mostRecent = song.data.tracks[tracks.length-1].show_date;
  $('.song-b-details').html('');
  $('.song-b-details').append('<h5>Times Played</h5>');
  $('.song-b-details').append('<p>' + details.timesPlayed + '</p>');
  $('.song-b-details').append('<h5>First Played</h5>');
  $('.song-b-details').append('<p>' + details.debut + '</p>');
  $('.song-b-details').append('<h5>Most Recently Played</h5>');
  $('.song-b-details').append('<p>' + details.mostRecent + '</p>');
}
};

function displayVenueAInfo(venue){
  if (venue.data === null) {
    $('.song-b-details').html('');
    $('.song-b-details').append('<h4>Song Not Found</h4>');
  } else {
  var details = {};
  var showCount = venue.data.shows_count;
  details.showCount = venue.data.shows_count;
  details.cityState = venue.data.location;
  details.firstShow = venue.data.show_dates[0];
  details.lastShow = venue.data.show_dates[showCount-1];
  $('.venue-a-details').html('');
  $('.venue-a-details').append('<h5>Number of Shows</h5>');
  $('.venue-a-details').append('<p>' + details.showCount + '</p>');
  $('.venue-a-details').append('<h5>Location</h5>');
  $('.venue-a-details').append('<p>' + details.cityState + '</p>');
  $('.venue-a-details').append('<h5>First Show</h5>');
  $('.venue-a-details').append('<p>' + details.firstShow + '</p>');
  $('.venue-a-details').append('<h5>Most Recent Show</h5>');
  $('.venue-a-details').append('<p>' + details.lastShow + '</p>');
}
}

function displayVenueBInfo(song){

}

// function displayVenueInfo(venue){
//
// };
//
// function getSongInfo(song){
//   var myGet = new XMLHttpRequest();
//   myGet.open('GET', 'http://phish.in/api/v1/songs/'+ song +'.json', true);
//   myGet.responseType='json';
//   myGet.setRequestHeader('Accept', 'application/json');
//   myGet.addEventListener("load", displaySongInfo);
//   myGet.send();
//
// };
//
// function getSongInfoJQuery(song){
//   $.get('http://phish.in/api/v1/songs/'+ song, displaySongInfo);
// };
// function getVenueInfo(venue){
//
// };
//
});
