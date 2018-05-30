/* Disclaimer
    Created By Matt Girard
    https://labaleinebasque.fr
    Feel free to use, modify and spread around you,
    please be kind, keep this comment in the file or mention my website
    (c) Matt Girard - La Baleine Basque - 2018 
*/

/* 
    this script is intended for easying creation and formating for both sheets and ranges.
    You need to define the available types in each case.
    Right now, I created those two cases to match my Google AdWords script requirements.
*/

function formatRangeForReport(spreadsheetId, sheetId, type) {
    const ss = SpreadsheetApp.getSpreadsheetById(spreadsheetId);

    if (ss.getSheetByName(sheetId) == null) {
        ss.insertSheet(sheetId);
    };

    const sheet = ss.getSheetByName(sheetId);

    switch (type) {
        case "Conv AdW":
            sheet.getRange(1, 1, 1, 4).setValues([
                ["Client : ", "", "Dernière Vérif : ", ""]
            ]).setBackground("#ff9900").setFontWeight("bold");

            sheet.getRange(2, 1, 1, 7).setValues([
                ["Date", "Clicks", "Impressions", "Conversions", "Dépenses", "CPC", "CPA"]
            ]).setBackground("#6fa8dc").setFontWeight("bold");

            break;

        default:
            sheet.getRange(1, 1, 1, 4).setValues([
                ["Client : ", "", "Dernière Vérif : ", ""]
            ]).setBackground("#ff9900").setFontWeight("bold");

            sheet.getRange(2, 1, 1, 7).setValues([
                ["Date", "Clicks", "Impressions", "Dépense", "Conversions", "CPC", "CPA"]
            ]).setBackground("#6fa8dc").setFontWeight("bold");

            break;
    };
}

function resetSpreadsheet(sheetToKeep) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const allSheets = ss.getSheets();

    Logger.log(allSheets);

    allSheets.forEach(function (sheet) {
        if (sheet != sheetToKeep) {
            ss.deleteSheet(sheet);
        };
    });
}