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
    $('.home').hide();
  }();
}
var arrayOfUsernames = [];
function apiRequests() {
  $.ajax({
    async: false,
    url: 'https://api.gitter.im/v1/rooms/56f9df0785d51f252abb4f57/users?limit=300',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: 'Bearer 4277caf3b83c61142f47eef26b0bd41786285ae9'
    },
    method: 'GET',
    dataType: 'json',
    success: function(gitterData) {
      //console.log(gitterData);
      gitterData.forEach(function(object) {
        $.ajax({
          url: 'https://www.freecodecamp.com/api/users/about?username=' + object.username.toLowerCase(),
          async: false,
          method: 'GET',
          dataType: 'json',
          success: function(fccData) {
            arrayOfUsernames.push([object.displayName, fccData.about.username, fccData.about.browniePoints]);
          },
          error: function() {
            arrayOfUsernames.push([object.displayName, object.username, null]);
          }
        });
      });
    },
    error: function() {
      console.log('Gitter API failed.');
    }
  });
}
$(document).ready(function() {
  apiRequests();
  arrayOfUsernames.sort(function(a, b) {
    return b[2] - a[2];
  });
  arrayOfUsernames.forEach(function(user) {
    if (user[2] === null)
      $('.leaderboard > .container').append('<div class="row"><h3>' + user[0] + ' @' + user[1] + '</h3><h4>Account not linked to freeCodeCamp</div>');
    else
      $('.leaderboard > .container').append('<div class="row"><h3>' + user[0] + ' @' + user[1] + '</h3><h4>Brownie Points: ' + user[2] + '</div>');
  });
  showHome();
  $('#about').on('click', function() {
    showAbout();
  });
  $('#contact').on('click', function() {
    showContact();
  });
  $('#home').on('click', function() {
    showHome();
  });
  $('#leaderboard').on('click', function() {
    showLeaderboard();
  });
});
