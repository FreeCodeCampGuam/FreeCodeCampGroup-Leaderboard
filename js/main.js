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
    url: 'https://discordapp.com/api/guilds/206276256818266112/members?limit=3',
    headers: {
      Authorization: 'Bot MjA2MzIxNzc5Njc5OTUyODk3.CnnfwA.cLmD9AfI-5ugzVdMRSPgK4uyp1Q',
    },
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      data.forEach(function(object) {
        console.log(object.user.username);
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
