/* 
Script created by Matt on 2018-08-20

 ** DISCLAIMER **

    This script is intended to work with Google Script Services, some of the methods used here are not Vanilla JS
    and won't be recognized in other environments.

 ** GOAL OF THIS SCRIPT ** 

The purpose of this mail was originaly to recover a CSV file from a Gmail message, and send the proper data to a
Google Sheet file.

 ** THINGS TO DO **

Today, this script is intended to work with a specific mail and CSV file.
Things to add :
> choose FROM or SUBJECT; > DONE
> check if attachment is a ZIP file, > DONE
> let user decide of CharCode and separator > DONE
> let user choose the spreadsheet ID and/or the destination sheet > DONE
> Check if SS/Sheet exists, if not create one 

*/

// VAR options

var optionMailQuery = true; // set FALSE to use the FROM query

// VAR dedicated to mail management

var from = ""; // example "adctr@microsoft.com"
var subject = ""; // example "Votre rapport programmé est prêt à être affiché" 
var charCode = ""; // example "UTF-8"
var separator = ""; // example ";"

// VAR dedicated to Data management

var lineNumber = 10; // MUST BE AN INTEGER

// VAR dedicated to sheet management

var spreadsheetToWrite = ""; // example "1lAIXLWjIeN7uQ8b76gPIVvzWY7iApAbc1sk0VV24Ezw"
var sheetToWrite = ""; // example "TEMP" use only names, not ID !

function getAttach() {

    var data2send = [];

    if (optionMailQuery) {
        var firstThread = GmailApp.search('subject:"' + subject + '"');
    } else {
        var firstThread = GmailApp.search('from:"' + from + '"');
    }

    var messages = firstThread[0].getMessages();
    var msgIterator = 0;

    for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        var timestamp = message.getDate();

        var today = new Date();

        if (today.getDay() == timestamp.getDay() && msgIterator < 1) {
            var attachments = message.getAttachments();
            for (var k = 0; k < attachments.length; k++) {
                // Check if attachment is of type ZIP

                if (attachments[k].getContentType() == "application/zip") {
                    var file = Utilities.unzip(attachments[k])[0];
                } else {
                    var file = attachments[k];
                }

                Logger.log(file.getContentType());

                var csvData = Utilities.parseCsv(file.getDataAsString(charCode), separator);

                //        Maintenant faut récupérer les Array 9 et 10
                //        data2send.push(csvData[9]);
                data2send.push(csvData[lineNumber]);

                pushToSheet(data2send);
                Logger.log(data2send);

                msgIterator += 1;

            };
        };
    };
}

function pushToSheet(data2receive) {

    if (spreadsheetToWrite === "") {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
    } else {
        var ss = SpreadsheetApp.openById(spreadsheetToWrite);
    }

    if (sheetToWrite === "") {
        var sheet = ss.getSheetByName("TEMP");
        // sheet.clearContents().clearFormats();
    } else {
        var sheet = ss.getSheetByName(sheetToWrite);
    }

    var timestamp = Utilities.formatDate(new Date(new Date().getTime() - (24 * 3600 * 1000)), "GMT+1", "dd-MM-yy");
    data2receive[0].unshift(timestamp);

    sheet.getRange(sheet.getLastRow() + 1, 1, data2receive.length, data2receive[0].length).setValues(data2receive);

}