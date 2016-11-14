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

function displaySongAInfo(song){
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
};

function displaySongBInfo(song){
  var details = {};
  var tracks = song.data.tracks
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
};



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
