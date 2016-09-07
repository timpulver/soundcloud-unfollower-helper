/*
 * Script to get a Soundcloud API Access Token
*/

var SC = require('soundcloud-nodejs-api-wrapper');
var opener = require('opener');

var credentials = {
     client_id : 'YOUR CLIENT_ID',
     client_secret : 'YOUR_CLIENT_SECRET',
     username : 'YOUR_EMAIL_ADDRESS',
     password : 'YOUR_PASSWORD'
    };

var sc = new SC(credentials);
var client = sc.client();

client.exchange_token(function(err, result) {

  var access_token = arguments[3].access_token;

  console.log('Full API auth response was:');
  console.log(arguments);

  // we need to create a new client object which will use the access token now
  client = sc.client({access_token : access_token});
  console.log(access_token + "<---- put into .bash_profile");
});
