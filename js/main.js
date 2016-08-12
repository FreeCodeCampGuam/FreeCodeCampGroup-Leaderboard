var arrayOfCampers = [];
var dateThreshold = new Date(2000,5,1);  // change this via user-input
var ranks = [0,50,100,200,300,400];  // probably want to increase these later
// updates the camper's brownie 'rank'
// notice, rank can be 0. returns false if that's the case
function updateRank(camper) {
  var rank = 0;
  for(let threshold of ranks) {
    if(camper.points < threshold) {
      console.log(camper.username +' is rank '+rank);
      break;
    }
    rank++;
  }
  camper.rank = rank;
  return rank !== 0;
}
function updateAge(camper) {
  camper.daysOld = dateToAge(camper.created)
}
function dateToAge(date) {
  return daysBetween(date, Date.now())
}
// http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
function treatAsUTC(date) {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}
function daysBetween(startDate, endDate) {
  var millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.round((treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay);
}

// function apiRequests() {
//   $.ajax({
//     async: false,
//     url: 'https://guarded-everglades-36180.herokuapp.com/api',
//     method: 'GET',
//     dataType: 'json',
//     success: function(data) {
//       for (var camper in data.campers) {
//         arrayOfCampers.push(camper);
//         updateCamper({"username" : camper.username, "points" : data.fccData.browniePoints});
//         updateCamper({"username" : camper.username, "avatar" : hubData.avatar_url, "created" : new Date(hubData.created_at)});
//       }
//       // // console.log(gitterData);
//       // gitterData.forEach(function(object, i) {
//       //   // $('.leaderboard > .container').append('<div class="row" id="place'+(i+1)+'"></div>');
//       //   var camper = {
//       //     "display" : object.displayName,
//       //     "username" : object.username,
//       //     "points" : -1,
//       //     "rank" : 0,
//       //     "avatar" : null,
//       //     "created" : null,
//       //     "daysOld" : null
//       //   };
//       //   arrayOfCampers.push(camper);
//       //   $.ajax({
//       //     url: 'https://www.freecodecamp.com/api/users/about?username=' + object.username.toLowerCase(),
//       //     async: true,
//       //     method: 'GET',
//       //     dataType: 'json',
//       //     success: function(fccData) {
//       //       updateCamper({"username" : object.username, "points" : fccData.about.browniePoints});  // removed about.username cause we need to find users later by unique value
//       //       // not sure if displayName is unique. object.username should be though. if we use object and about.username, might be differences
//       //       //camper.concat([fccData.about.username, fccData.about.browniePoints]);
//       //     },
//       //     error: function() {
//       //       updateCamper({"username" : object.username, "points" : -2});  // shrug*
//       //       //camper.concat([object.username, null]);
//       //     }
//       //   });
//       //   // Github call to get 'join' date. assuming joined github at same time
//       //   $.ajax({
//       //     url: 'https://api.github.com/users/' + object.username,
//       //     async: true,
//       //     method: 'GET',
//       //     dataType: 'json',
//       //     success: function(hubData) {
//       //       updateCamper({"username" : object.username, "avatar" : hubData.avatar_url, "created" : new Date(hubData.created_at)});
//       //       //camper.push(hubData.created_at)
//       //     },
//       //     error: function() {
//       //       console.log('github request error on user: ' + object.username);
//       //     }
//       //   });
//       //   /*console.log(camper)
//       //   arrayOfCampers.push(camper)*/
//       // });
//     },
//     error: function() {
//       console.log('Could not load JSON file.');
//     }
//   });
// }
function updateDateFilter() {
  console.log('updating date.');
/*  for (let stuff in $('#age-filter-selector')) {
    console.log(stuff);
    console.log($('#age-filter-selector')[stuff]);
  }*/
  console.log($('#age-filter-selector').val());
  dateThreshold = new Date($('#age-filter-selector').val());
  //dateThreshold = new Date($('#age-filter-selector').value);
  //console.log($('#age-filter-selector').value);
  //console.log(dateThreshold);
  updateCamper(arrayOfCampers[0]);  // we need to rewrite updateCamper
}
function updateCamper(camper) {
  for (let c of arrayOfCampers) {  // is there a quicker find?
    if (c.username === camper.username) {
      for (let prop in camper) {
        c[prop] = camper[prop];
      }
      updateRank(c);  // maybe this should be a method of the camper class
      updateAge(c);
      break;
    }
  }
  console.log(camper)
  arrayOfCampers.sort(function(a, b) {
    return b.points - a.points;
  });
  var filteredUsers = arrayOfCampers.filter(aCamper => aCamper.created > dateThreshold)
  console.log('filtered users:');
  console.log(filteredUsers);
  //$('.leaderboard > .container').html('<div>Displaying Users that joined within '+dateToAge(dateThreshold)+' days</div>')
  $('.leaderboard > .container').html('');
  var found = false;
  filteredUsers.forEach(function(user, i) {
    $('.leaderboard > .container').append('<div class="row" id="place'+(i+1)+'"></div>');
    if (user.points < 0 && !found) {
      $('#place'+(i+1)).addClass('first_error');
      found = true;
    }
    else {
      $('#place'+(i+1)).removeClass('first_error');
    }
    _displayCamper(i+1,user);
  });
}
function _displayCamper(place, camper) {
  // avatar
  var img = '<img class="avatar mostly_transparent" src="images/favicons/android-chrome-192x192.png" alt="" />'; // insert no-avatar image here
  if (camper.avatar !== null) {
    img = '<img class="avatar" src="'+camper.avatar+'" alt="" />';
  }
  $('#place'+place).html(img + '<div class="user_info"><h3 class="display">'+camper.display+'</h3>'+
      '<span class="mention">@' + camper.username + '</span></div>');

  // age
  $('#place'+place).append('<div class="age col2">Joined '+camper.daysOld+' days ago.</div>')
  if (camper.points >= 0) {
    $('#place'+place).append('<div class="points"><h4>Brownie Points: '+camper.points+'</h4>'+
        '<img class="brownie" src="images/ranks/brownie'+camper.rank+'.png" alt="rank'+camper.rank+'"/>'+
        '</div>');
  }
  else {
    $('#place'+place).append('<div class="error"><h4>Account not linked to freeCodeCamp</h4></div>');
  }
}

$(document).ready(function() {
  // apiRequests();
  // http://stackoverflow.com/questions/15991356/jquery-scroll-to-section-of-page
  for (let label of ["home","about","contact","leaderboard"]) {
    $("#"+label).click(function() {
      $('html, body').animate({
        scrollTop: $("."+label).offset().top - 60
      }, 700);
    });
  }
});
