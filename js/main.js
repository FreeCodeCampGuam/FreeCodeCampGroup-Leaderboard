$(document).ready(function() {
  apiRequests();
  // arrayOfUsernames.sort(function(a, b) {
  //   return b[2] - a[2];
  // });
  arrayOfUsernames.forEach(function(user, i) {
    if (user[2] === null)
    $('.leaderboard > .container').append('<div class="row" id="place'+(i+1)+'"><h3>' + user[0] + ' @' + user[1] + '</h3><h4 class="error">Account not linked to freeCodeCamp</div>');
    else
    $('.leaderboard > .container').append('<div class="row" id="place'+(i+1)+'"><h3>' + user[0] + ' @' + user[1] + '</h3><h4>Brownie Points: ' + user[2] + '</div>');
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
var arrayOfUsernames = [];

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
      // console.log(gitterData);
      gitterData.forEach(function(object, i) {
        var camper = {
          "display" : object.displayName,
          "username" : object.username,
          "points" : -1,
          "created" : null
        };
        arrayOfUsernames.push(camper);
        $('.leaderboard > .container').append('<div class="row" id="place'+(i+1)+'></div>');
        _displayCamper(i+1,camper);
        $.ajax({
          url: 'https://www.freecodecamp.com/api/users/about?username=' + object.username.toLowerCase(),
          async: true,
          method: 'GET',
          dataType: 'json',
          success: function(fccData) {
            updateCamper({"username" : object.username, "points" : fccData.about.browniePoints});  // removed about.username cause we need to find users later by unique value
            // not sure if displayName is unique. object.username should be though. if we use object and about.username, might be differences
            //camper.concat([fccData.about.username, fccData.about.browniePoints]);
          },
          error: function() {
            updateCamper({"username" : object.username, "points" : -2});  // shrug*
            //camper.concat([object.username, null]);
          }
        });
        // Github call to get 'join' date. assuming joined github at same time
        $.ajax({
          url: 'https://api.github.com/users/' + object.username,
          async: true,
          method: 'GET',
          dataType: 'json',
          success: function(hubData) {
            updateCamper({"username" : object.username, "created" : hubData.created_at});
            //camper.push(hubData.created_at)
          },
          error: function() {
            console.log('github request error on user: ' + object.username);
          }
        });
        /*console.log(camper)
        arrayOfUsernames.push(camper)*/
      });
    },
    error: function() {
      console.log('Gitter API failed.');
    }
  });
}

function updateCamper(camper) {
  for (let c of arrayOfUsernames) {  // is there a quicker find?
    if (c.username === camper.username) {
      for (let prop in camper) {
        c[prop] = camper[prop];
      }
      break;
    }
  }
  arrayOfUsernames.sort(function(a, b) {
    return b.points - a.points;
  });
  arrayOfUsernames.forEach(function(user, i) {
    _displayCamper(i+1,user);
  });
}
function _displayCamper(place, camper) {
  $('#place'+place).html('<h3>' + camper.display + ' @' + camper.username + '</h3>');
  if (camper.points >= 0) {
    $('#place'+place).append('<h4>Brownie Points: '+camper.points);
  }
  else {
    $('#place'+place).append('<h4 class="error">Account not linked to freeCodeCamp');
  }
}
