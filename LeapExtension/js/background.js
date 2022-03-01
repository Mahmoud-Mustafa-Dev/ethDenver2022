/*
- This code works in the background - inspect background page from the extension 
  manager to debug.

- It checks the current tab you are in and if it was on a ytb video 
  we execute the foreground script to track watchTime
*/

console.log('from background');

//track youtube
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        console.log(current_tab_info.url);
        if(/^https:\/\/www\.youtube\.com\/watch/.test(current_tab_info.url)) {
            chrome.tabs.executeScript(null, {file: './js/ytb-foreground.js'}, () => console.log('ytb-foreground is injected'));
        }
    });
});


//this allows us to know if current tab was updated with the desired url.
chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
    var url = tab.url;
    if (url !== undefined && changeinfo.status == "complete") {
        console.log(url);
        if (/^https:\/\/www\.youtube\.com\/watch/.test(tab.url)) {
            chrome.tabs.executeScript(null, {file: './js/ytb-foreground.js'}, () => console.log('ytb-foreground is injected'));
        }  
    }
});

//track twitch
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        console.log(current_tab_info.url);
        if(/^https:\/\/www\.twitch\.tv\//.test(current_tab_info.url)) {
            chrome.tabs.executeScript(null, {file: './js/twitch-foreground.js'}, () => console.log('twitch foreground is injected'));
        }
    });
});


//this allows us to know if current tab was updated with the desired url.
chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
    var url = tab.url;
    if (url !== undefined && changeinfo.status == "complete") {
        console.log(url);
        if (/^https:\/\/www\.twitch\.tv\//.test(tab.url)) {
            chrome.tabs.executeScript(null, {file: './js/twitch-foreground.js'}, () => console.log('twitch foreground is injected'));
        }  
    }
});


// YTB
const YTB_CLIENT_ID = encodeURIComponent("452861637826-bo1s92nbod30ebibp7knh0bsnmoghlqf.apps.googleusercontent.com");
const YTB_SCOPE = encodeURIComponent("openid");

// TWITCH
const TWITCH_CLIENT_ID = encodeURIComponent("jsejr1bhucuullw5b84qwy5w3s2n5p"); // tells Twitch we’re allowed to use their OpenID Endpoint
const TWITCH_SCOPE = encodeURIComponent("openid user:read:email"); //asks Twitch for an OpenID permissions

const REDIRECT_URI = encodeURIComponent("https://beepkdkcdeoehcimbgjjnmcndlhbkjag.chromiumapp.org"); //where to redirect the user after giving us the token
const RESPONSE_TYPE = encodeURIComponent("token id_token"); //asks for a specific category of information
const CLAIMS = encodeURIComponent(
	JSON.stringify({
		id_token: { email: null, email_verified: null }
	})
); // initialize which information about the user we want
const STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15)); //helps personalize our OpenID request

let user_signed_in = false;
let ACCESS_TOKEN = null;
let interval_id = null;

function create_twitch_endpoint() {
	let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
	let openid_url =
		`https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${TWITCH_SCOPE}&claims=${CLAIMS}&state=${STATE}&nonce=${nonce}`;
	return openid_url;
}

function create_ytb_endpoint() {
	let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
	let openid_url =
		`https://accounts.google.com/o/oauth2/v2/auth?client_id=${YTB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${YTB_SCOPE}&claims=${CLAIMS}&state=${STATE}&nonce=${nonce}`;
	return openid_url;
}

function getTwitchUserData(access_token) {
    
	fetch('https://api.twitch.tv/helix/users?', {
		method: "get",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Bearer ' + access_token,
			'Client-Id': TWITCH_CLIENT_ID
		}
	})
  	.then((response) => {
    	return response.json();
  	})
  	.then((myJson) => {
    	console.log(myJson);
  	});
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.message === "login-twitch") {
		if (user_signed_in) {
		    //TODO handle when user is already signed in
			console.log("User is already signed in.");
		} else {
			// sign user in with Twitch
			chrome.identity.launchWebAuthFlow({
				url: create_twitch_endpoint(),
				interactive: true
			}, function (redirect_url) {
				console.log(redirect_url)
				if (chrome.runtime.lastError || redirect_url.includes('error=access_denied')) {
					sendResponse({ message: 'fail' });
				} else {
					let id_token = redirect_url.substring(redirect_url.indexOf('id_token=') + 9);
					id_token = id_token.substring(0, id_token.indexOf('&'));
					ACCESS_TOKEN = redirect_url.substring(redirect_url.indexOf('access_token=') + 13);
					ACCESS_TOKEN = ACCESS_TOKEN.substring(0, ACCESS_TOKEN.indexOf('&'));
                    getTwitchUserData(ACCESS_TOKEN);
	
					const user_info = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(id_token.split(".")[1]));
					localStorage["user-info"] = user_info;
					if (user_info.iss === 'https://id.twitch.tv/oauth2' && user_info.aud === TWITCH_CLIENT_ID) {
						localStorage["logged-in"] = true; 
						user_signed_in = true;

						interval_id = setInterval(() => {
							fetch('https://id.twitch.tv/oauth2/validate', {
								headers: {
									'Authorization': 'OAuth ' + ACCESS_TOKEN
								}
							})
								.then(res => {
									console.log(res.status)
									if (res.status === 401) {
										localStorage["logged-in"] = false; 
										user_signed_in = false;
										clearInterval(interval_id);
									}
								})
								.catch(err => console.log(err))
						}, 3600000);
						// change user view
						/*
						chrome.browserAction.setPopup({ popup: "new screen when logged in" }, () => {
							sendResponse({ message: "success" });
						});
						*/
					}
				}
			});
		}
		return true;
	} else if (request.message === "logout-twitch") {
		//user_signed_in = false;
		// TODO Store login status and change user view
		/*
		chrome.browserAction.setPopup({ popup: "new screen when logged out" }, () => {
			sendResponse({ message: "success" });
		});
		*/
		return true;
	} else if(request.message === "login-ytb") {
		if (user_signed_in) {
			console.log("User is already signed in.");
		} else {
			// sign user in with YTB
			chrome.identity.launchWebAuthFlow({
                'url': create_ytb_endpoint(),
                'interactive': true
            }, function (redirect_url) {
                if (chrome.runtime.lastError) {
                    // problem signing in
                } else {
                    let id_token = redirect_url.substring(redirect_url.indexOf('id_token=') + 9);
                    id_token = id_token.substring(0, id_token.indexOf('&'));
                    const user_info = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(id_token.split(".")[1]));

                    if ((user_info.iss === 'https://accounts.google.com' || user_info.iss === 'accounts.google.com')
                        && user_info.aud === YTB_CLIENT_ID) {
						// TODO change user view
						/*
						chrome.browserAction.setPopup({ popup: "new screen when logged in" }, () => {
							sendResponse({ message: "success" });
						});
						*/
                        console.log("User successfully signed in.");
						localStorage["logged-in"] = true; 
                        user_signed_in = true;
                    } else {
                        // invalid credentials
                        console.log("Invalid credentials.");
                    }
                }
            });

            
		return true;
		}
	} else if (request.message === "logout-ytb") {
		// TODO change user view
		localStorage["logged-in"] = false; 
		user_signed_in = false;
		return true;
	} 
});

