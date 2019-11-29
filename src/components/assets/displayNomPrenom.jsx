function displayNomPrenom(textVar) {
    var text =textVar;
    var reversedText = text
      .split("@bridgebankgroup.com")
      .reverse()
      .join("");
    var tab = reversedText.split(".");
    var prenom = tab[0];
    prenom = prenom[0].toUpperCase() + prenom.slice(1);
    var nom = tab[1].toUpperCase();
    return nom + " " + prenom;
  }

  export default displayNomPrenom ;