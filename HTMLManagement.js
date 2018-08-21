/* Disclaimer
    Created By Matt Girard
    https://labaleinebasque.fr
    Feel free to use, modify and spread around you,
    please be kind, keep this comment in the file or mention my website
    (c) Matt Girard - La Baleine Basque - 2018 
*/

// Script pour appeler une page, et retourner le contenu HTML sous forme de String, le code réponse et un timestamp

function scrapSite(url) {

  const data = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  var timestamp = new Date();
  var response = data.getResponseCode();

  if (response == 404) {

    var error = "Erreur 404 pour " + url;

// Retourne un Array contenant une chaine vide (respecte type String de l'élément), l'erreur et le timestamp

    return ["", error, timestamp];

  } else {

    const text = data.getContentText();

// Retourne un Array contenant le code HTML de la page, le code réponse 200 et le timestamp

    return [text, response, timestamp];
  }
}

// Récupérer une portion de texte dans le content HTML, et en renvoie une partie définie
// au début par Start (type: String) et à la fin par End (type: String)

function getDataFromHTML(textHTML, start, end) {
  
  if (start === undefined || end === undefined ) {
   
    var error = new Error('Erreur : les valeurs start et end sont non précisées');
   
    return error;

  } else {
   
    var searchstring = start;
    
    var indexStart = textHTML.search(start);
    var indexEnd = textHTML.search(end);
   
    var longueur = searchstring.length;
   
    var pos = indexStart + longueur;
    
    var data = textHTML.substring(pos, indexEnd);
    
    return data;
  };
  
  
  
}