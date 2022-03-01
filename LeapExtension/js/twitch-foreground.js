console.log('from twitch foreground');

var totalWatchTime = 0;
var startTime, endTime;

//get the HTMLMediaElement from ytb page.
var video = document.querySelector('video');

if(video) {

console.log("is the vid paused? " + video.paused);
//TODO figure out a better way to identify if a twitch video is live or not
var isLive = document.getElementsByClassName("live-time");
console.log(isLive[0]);
if(isLive[0] === undefined) {
    console.log("this video is not live");
} else {
    console.log("LIVE");
    if(!video.paused) {
        startTime = performance.now();
    }
    
    video.onplaying = function() {
        console.log("PLAYING");
        startTime = performance.now();
    };
    
    video.onpause = function() {
        console.log("STOPPED");
        endTime = performance.now();
        var timeDiff = endTime - startTime; 
        timeDiff /= 1000;
        var seconds = Math.round(timeDiff);
        totalWatchTime += seconds;
        console.log("you watched for this amount of seconds: " + seconds);
        console.log("this is your total watchtime in seconds so far: " + totalWatchTime);
    }
}

}