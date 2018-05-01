/* Disclaimer
    Created By Matt Girard
    https://labaleinebasque.fr
    Feel free to use, modify and spread around you,
    please be kind, keep this comment in the file or mention my website
    (c) Matt Girard - La Baleine Basque - 2018 
*/

function checkColumnsTitles(e) {

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (e === undefined) {
        return new Error("Error: please indicate a correct sheet name");
    } else {
        const sheet = ss.getSheetByName(e);
    }

    const QtyColumns = sheet.getDataRange().getLastColumn();
    const intitules = sheet.getRange(1, 1, 1, QtyColumns).getValues();

    Logger.log(QtyColumns);
    Logger.log(intitules);
    return intitules;

}