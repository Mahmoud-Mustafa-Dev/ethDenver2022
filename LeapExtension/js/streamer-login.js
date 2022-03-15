
document.getElementById('twitch-sign-in').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'login-twitch' }, function (response) {
        
        if (response.message === 'success') {
            console.log("streamer signed in using twitch");
        
            chrome.action.setPopup({ popup: "./streamer-logged-in.html" }, () => {
                if(response.user_data) {
                    //here we get the user data for the first time so we need to store it
                    //you can access information like this: response.user_data.id
                    console.log("here is the user data: " + JSON.stringify(response.user_data));
                    

                    addUserToDatabase(response.user_data);
                    // after we get a success response from the data base that we stored data we should acitvate the 
                    // line below:

                    // window.location.href = './streamer-logged-in.html';
                } else {
                    //user is already signed in
                    window.location.href = './streamer-logged-in.html';
                }
			});
        } 
    });
});

//halting the ytb stuff temoporarily 

/*document.getElementById('ytb-sign-in').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'login-ytb' }, function (response) {
        if (response.message === 'success') {
            console.log("streamer signed in using ytb");
            chrome.browserAction.setPopup({ popup: "./streamer-logged-in.html" }, () => {
                window.close();
			});
        } 
    });
});*/


function addUserToDatabase(user_data) {
    chrome.runtime.sendMessage({ message: 'append-user', body: user_data }, function (response) {
        if(response.message === 'success') {
            console.log("data was submitted to the database.");

            //after we get a successful response we need to move to another screen.
            //window.location.href = './streamer-logged-in.html';
        }
    });
}