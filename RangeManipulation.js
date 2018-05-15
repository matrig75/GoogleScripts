/* Disclaimer
    Created By Matt Girard
    https://labaleinebasque.fr
    Feel free to use, modify and spread around you,
    please be kind, keep this comment in the file or mention my website
    (c) Matt Girard - La Baleine Basque - 2018 
*/

function getColumnsTitles(e) {

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (e === undefined) {
        return new Error("Please indicate a correct sheet name");
    } else {
        const sheet = ss.getSheetByName(e);
    }

    const QtyColumns = sheet.getDataRange().getLastColumn();
    const intitules = sheet.getRange(1, 1, 1, QtyColumns).getValues();

    return intitules[0];

}

function removeEmptyRows() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("");
    
    const lastRow = sheet.getLastRow();
      
    const checkRow = sheet.getRange(1, 1, lastRow).getValues();
    
    var Row2Delete = [];
    
    checkRow.forEach(function(element) {
      
      if (element[0].length == 0) {
        Row2Delete.push(checkRow.indexOf(element) + 1);
      }
      
    });
    
    var Row2Delete = Row2Delete.reverse()
    
    Row2Delete.forEach(function(row) {
      sheet.deleteRow(row);
    });
  }