document.getElementById('twitch-sign-in').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'login-twitch' }, function (response) {
        if (response.message === 'success') {
            console.log("viewer signed in using twitch");
            chrome.browserAction.setPopup({ popup: "./viewer-logged-in.html" }, () => {
                window.location.href = './viewer-logged-in.html';
			});
        } 
    });
});

document.getElementById('ytb-sign-in').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'login-ytb' }, function (response) {
        if (response.message === 'success') {
            console.log("viewer signed in using ytb");
            chrome.browserAction.setPopup({ popup: "./viewer-logged-in.html" }, () => {
                window.location.href = './viewer-logged-in.html';
			});
        } 
    });
});


//TODO login viewers via ytb or twitch

/*document.getElementById('sync-wallet-btn').addEventListener('click', function () {
   // sync_wallet();
    console.log(localStorage["wallet-address"]);
});

function sync_wallet() {
    //Pull text from user inputbox
    var data = new String(document.getElementById("wallet-input").value);
    console.log("length is: " + data.length);
    if(data.length >= 26 && data.length <= 35) {
    console.log("this wallet address is valid");
    //Save it to the localStorage variable which will always remember what you store in it
    localStorage["wallet-address"] = data; 
    } else {
    console.log("this wallet address is not valid");
    }
}*/
