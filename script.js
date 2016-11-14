$(document).ready(function(){

$(".button-collapse").sideNav();
$(".card-action:a").click();

$('#songSubmit').click(function(){
  var $songA = $('input[name=song_a]').val();
  var $songB = $('input[name=song_b]').val();
  console.log($songA,$songB);

});

});
