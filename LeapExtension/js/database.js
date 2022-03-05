//webserver boilerplate

var express = require("express")

// import google api

var { google } = require("googleapis");

// creating express app

var app = express();

// creating single root endpoint, request and response






app.get("/", async (req, res) => {

    // authenticating with google api

    var auth = new google.auth.GoogleAuth({

        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"

    });

    // request client object for auth

    var client = await auth.getClient();

    // instance of Google Sheets API

    var googleSheets = google.sheets({ version: "v4", auth: client });

    // spreadsheet variable

    var spreadsheetId = "1-f2vZxgWQ1cbstJIB4GGp0SEqMuqZKR3JEZocHuSYOQ";


    // Get metadata about spreadsheet

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });


    // Read rows from spreadsheet

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        // sets the range with the sheetname in spreadsheet and the cells of that sheet
        range: "Sheet1!A:C",

    });
    //read rows call



    // write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:C",

        // two useful variables RAW and USER_ENTERED which attempts to pass numbers as int, date as date, etc
        valueInputOption: "USER_ENTERED",

        // info you want to pass into spreadsheet

        resource: {

            // for each row you want to add, add another nested array []
            values: [jsonUserArray],


        }

    })

    
    res.send(getRows.data);
});

app.listen(1337, (req, res) => console.log("Listening on 1337")); // listen
