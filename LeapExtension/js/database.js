console.log("here we initialize the database");
/*
Initialize database here.
*/

const data = {
    "email": "example",
    "id": "qwe",
    "created_at": "12/12",
    "role": "streamer"
};

fetch('https://1tz1ahylf7.execute-api.us-east-1.amazonaws.com/items', {
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "append-user") {
        console.log("here we need to submit user data to the database");
        console.log(JSON.stringify(request.body));
        //Here we get the user data and we need to add it to ther database now.





        //once the data was added to the database send a success response.
        sendResponse({message: "success"});
    }
});