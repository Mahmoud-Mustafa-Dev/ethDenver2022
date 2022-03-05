// var databaseApp = require('.\database.js');

document.getElementById('twitch-sign-in').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'login-twitch' }, function (response) {
    /*    if (response.message === 'success') {
            console.log("we signed in using twitch");
        } */ console.log("$$$" + response);
    });
});

document.getElementById('ytb-sign-in').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'login-ytb' }, function (response) {
        if (response.message === 'success') {
            console.log("we signed in using ytb");
        } 
    });
});

// make a test json file here and call app from database.js
// need to pass a variable from here into a place holder variable in the write function
// maybe write function needs to be named and figure out async



const jsonObj = {
    "id": "43417819",
    "login": "lucyspear",
    "display_name": "LucySpear",
    "type": "",
    "broadcaster_type": "",
    "description": "",
    "profile_image_url": "https://static-cdn.jtvnw.net/user-default-pictures-uv/998f01ae-def8-11e9-b95c-784f43822e80-profile_image-300x300.png",
    "offline_image_url": "",
    "view_count": 110,
    "email": "xyz@gmail.com",
    "created_at": "2013-05-11T08:53:24Z"
};

/*
 check for isStreamer https://www.javascripttutorial.net/javascript-array-some/
    if isStreamer write to sheet2 instead of sheet1 in sheets Range */

// want to pass jsonUserArray variable to the google sheets append function line 66 in database.js

var jsonUserArray = [jsonObj.login, jsonObj.email, jsonObj.created_at];
