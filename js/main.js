function showAbout() {
  $('.about').show();
  var hideOthers = function() {
    $('.contact').hide();
    $('.home').hide();
    $('.leaderboard').hide();
  }();
}
function showContact() {
  $('.contact').show();
  var hideOthers = function() {
    $('.about').hide();
    $('.home').hide();
    $('.leaderboard').hide();
  }();
}
function showHome() {
  $('.home').show();
  var hideOthers = function() {
    $('.about').hide();
    $('.contact').hide();
    $('.leaderboard').hide();
  }();
}
function showLeaderboard() {
  $('.leaderboard').show();
  var hideOthers = function() {
    $('.about').hide();
    $('.contact').hide();
    $('.leaderboard').hide();
  }();
}
// for testing purposes...
// currently testing leaderboard page
$(document).ready(function() {
  $('.leaderboard').show();
  $('.about').hide();
  $('.home').hide();
  $('.contact').hide();
  $.ajax({
    url: 'https://api.gitter.im/v1/rooms/56f9df0785d51f252abb4f57/users',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: 'Bearer 4277caf3b83c61142f47eef26b0bd41786285ae9'
    },
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      // console.log(data);
      var arrayOfUsernames = [];
      data.forEach(function(object) {
        arrayOfUsernames.push(object.username);
      });
      arrayOfUsernames = arrayOfUsernames.map(function(username) {
        
      });
    },
    error: function() {
      console.log('failed');
    }
  });
});

// $(document).ready(function() {

// // need to initially hide everything except home page
//   showHome();
//   $('#about').on('click', function() {
//     showAbout();
//   });
//   $('#contact').on('click', function() {
//     showContact();
//   });
//   $('#home').on('click', function() {
//     showHome();
//   });
//   $('#leaderboard').on('click', function() {
//     showLeaderboard();
//   });
// });
