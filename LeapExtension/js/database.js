console.log("here we initialize the database");
/*
Initialize database here.
*/


const data1 = {
    "email": "example3",
    "login": "2345",
    "created_at": "23/11",
    "role": "streamer"
};

async function putUserData(data) {

    return fetch('https://33nppeb8a1.execute-api.us-east-1.amazonaws.com/items', {
        method: 'PUT', // or 'POST'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}



async function getAllUserData() {
    const response = await fetch('https://33nppeb8a1.execute-api.us-east-1.amazonaws.com/items');
    const login = await response.json();
    console.log(login);

}


async function getUserData(username) {
    const response = await fetch('https://33nppeb8a1.execute-api.us-east-1.amazonaws.com/items/' + username);
    const login = await response.json();
    console.log(login);
    
}

        
       

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("MESSAGE: " + request.message);
    if(request.message === "append-user") {
        console.log("here we need to submit user data to the database");
        console.log(JSON.stringify(request.body));
        //Here we get the user data and we need to add it to ther database now.

        console.log(request.body.email);
        console.log(request.body.login);
        console.log(request.body.created_at);

        const user_data = {
            "email": request.body.email,
            "login": request.body.login,
            "created_at": request.body.created_at,
            "role": "streamer"
        };
        //TODO FIX the permission
        //putUserData(user_data).then(response => sendResponse({ message: "success" }));
        
        //once the data was added to the database send a success response.
        
    }
});