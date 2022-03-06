console.log("here we initialize the database");
/*
Initialize database here.
*/

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "append-user") {
        console.log("here we need to submit user data to the database");
        console.log(JSON.stringify(request.body));
        //Here we get the user data and we need to add it to ther database now.

        //once the data was added to the database send a success response.
        sendResponse({message: "success"});
    }
});