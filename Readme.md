# soundcloud-unfollower-helper

If you are an active Soundcloud user, there probably are a lot of people you follow who abandoned their account or whose sound you just don’t like any more. Time for a clean up!

*soundcloud-unfollower-helper* opens a random Soundcloud profile and let’s you easily cleanup this mess.

## Requirements

You need a Soundcloud API Token as well as [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/).

## Installation

### Environment variable

Open `~/.bash_profile` and add the following:  

```
# Soundcloud API
export SOUNDCLOUD_API_TOKEN="YOUR_API_TOKEN_HERE"
```
Replace the placeholder with your API-Token.  

If you don’t have an API token, yet, put in your user credentials in `get_access_token.js` (client-id and client-secret can be found here: [soundcloud.com/you/apps](http://soundcloud.com/you/apps)), then store the token as described above.

Run `source ~/.bash_profile`

Run `npm install` to install all dependencies.

## Usage

Run `npm start`

## Possible Errors

### 401 Not authorized

Access tokens can expire, try to generate a new one.
