/* Disclaimer
    Created By Matt Girard
    https://labaleinebasque.fr
    Feel free to use, modify and spread around you,
    please be kind, keep this comment in the file or mention my website
    (c) Matt Girard - La Baleine Basque - 2018 
*/

function dailyCheckMail(recipient, sujet, titles, content) {

    const envProd = true;

    var html = formatHtmlBodyfromArrays(titles, content);

    if (envProd) {

        MailApp.sendEmail({
            to: recipient,
            subject: sujet,
            htmlBody: html
        });
    }
}

function formatHtmlBodyfromArrays(titles, content) {
    var htmlBody = "";

    htmlBody += '<html><body><table width=auto cellpadding=0 border=0 cellspacing=0><tr bgcolor="#ddd">';

    titles.forEach(function (elementTitre) {
        htmlBody += "<td style='padding: 5px 10px; background-color: #ddd; color: white'>" + elementTitre + '</td>';
    });

    htmlBody += '</tr><tr>';

    content.forEach(function (tableRow) {
        tableRow.forEach(function (elementContent) {
            if (Array.isArray(elementContent)) {
                elementContent.forEach(function (sousElement) {
                    htmlBody += "<td style'padding: 5px 10px'>" + sousElement + '</td>';
                });
            } else {
                htmlBody += "<td style'padding: 5px 10px'>" + elementContent + '</td>';
            }
        });
        htmlBody += '</tr><tr>'
    });

    htmlBody += '</tr></table></body></html>';

    return htmlBody;
}

function formatHtmlTablefromArrays(titles, content) {
    var htmlBody = "<br>";

    htmlBody += '<table width=auto cellpadding=0 border=0 cellspacing=0><tr bgcolor="#ddd">';

    titles.forEach(function (elementTitre) {
        htmlBody += "<td style='padding: 5px 10px;  background-color: navyblue; color: white; text-align: center'>" + elementTitre + '</td>';
    });

    htmlBody += '</tr><tr>';

    content.forEach(function (tableRow) {
        tableRow.forEach(function (elementContent) {
            if (Array.isArray(elementContent)) {
                elementContent.forEach(function (sousElement) {
                    htmlBody += "<td style='padding: 5px 10px; text-align: center'>" + sousElement + '</td>';
                });
            } else {
                htmlBody += "<td style='padding: 5px 10px; text-align: center'>" + elementContent + '</td>';
            }
        });
        htmlBody += '</tr><tr>'
    });

    htmlBody += '</tr></table><br>';

    return htmlBody;
}

function formatHtmlListfromArrays(titles, content) {
    var htmlBody = "<body>";

    titles.forEach(function (elementTitre) {
        htmlBody += "<br><h2>" + elementTitre + '</h2><ul>';
    });

    content.forEach(function (tabs) {
        tabs.forEach(function (listElement) {
            if (Array.isArray(listElement)) {
                listElement.forEach(function (sousElement) {
                    htmlBody += "<li>" + sousElement + '</li>';
                });
            } else {
                htmlBody += "<li>" + listElement + '</li>';
            }
        });
        htmlBody += '</ul>'
    });

    htmlBody += '<br><p>En cas de problème</p></body>';

    return htmlBody;
}