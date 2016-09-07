// This script is intended to clean up your following-list on Soundcloud
// It will download all the follwings-data and open a random following-url
// in the browser, so you can check if you still like the sound that person makes.
//
// If you get a 401 response your request token might be expired,
// run get_access_token.js with your credentials to get a new one.

var SC = require('soundcloud-nodejs-api-wrapper');
var opener = require('opener');

var stdin = process.openStdin();

var sc = new SC({});

var apiToken = process.env.SOUNDCLOUD_API_TOKEN;
if(!apiToken) {
  console.log("Soundcloud API token environment variable not set. Quitting.")
  process.exit();
}
client = sc.client({access_token : apiToken});

// vars
var followings = [];

//request info about ourselves to get the number of followings
client.get('/me', {},function(err, result, response) {
  if (err) console.error(err);

  console.log("Username: " + result.username);
  console.log("Followings to load: " + result.followings_count);
  fillFollowingsArray();
});

// makes multiple request to the Soundcloud API and grabs all the followings,
// stores them in the global var "followings"
// calls itself recursively
// Soundcloud API only returns 200 items per call...
function fillFollowingsArray(err, result, response) {
  // first call, start at the beginning...
  if(!result) {
    client.get('/me/followings', {"limit": 200}, fillFollowingsArray);
  } else {
    followings = followings.concat(result.collection);
    // exract the cursor, needed for the next call
    cursor = extractPaginationCursor(result.next_href);
    if(cursor){
      client.get('/me/followings', {"cursor": cursor, "limit": 200}, fillFollowingsArray);
    }
    // we have all the followers in the array now...
    else {
      console.log("Loaded data of " + followings.length + " followings" );
      anotherRandomLink(followings);
      stdin.addListener("data", anotherRandomLink);
    }
  }
}

function anotherRandomLink(){
  var link = getRandomLink(followings);
  console.log("-------------------------");
  console.log("Random Following URL: " + link);
  opener(link);
  console.log("Another one? (press enter)");
}

// extracts the attribute "permanent_url" of a random object in the array
function getRandomLink(followings){
  if(!followings || followings.length == 0){
    console.log("Error, called with bad argument");
    return;
  }
  var ran = Math.floor((Math.random() * followings.length));
  return followings[ran].permalink_url;
}

// pagination-link looks like this: https://api.soundcloud.com/me/followings?client_id=xyz&page_size=50&cursor=1442576266000
// we need the cursor to request the next page
function extractPaginationCursor(next_href){
  if(!next_href) { return; }
    var searchText = "cursor=";
    var i = next_href.indexOf(searchText);
    if(i > 0) {
      var cursor = next_href.substring(i + searchText.length);
      return cursor;
    }
}
