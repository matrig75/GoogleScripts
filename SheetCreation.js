function formatRangeForReport(spreadsheetId, sheetId, type) {
    const ss = SpreadsheetApp.getSpreadsheetById(spreadsheetId);
    const sheet = ss.getSheetByName(sheetId);



    sheet.getRange(1, 1, 1, 4).setValues([
        ["Client : ", "", "Dernière Vérif : ", ""]
    ]).setBackground("#ff9900").setFontWeight("bold");

    sheet.getRange(2, 1, 1, 7).setValues([
        ["Date","Clicks", "Impressions", "Dépense", "Conversions", "CPC", "CPA" ]
    ]).setBackground("#6fa8dc").setFontWeight("bold");
}