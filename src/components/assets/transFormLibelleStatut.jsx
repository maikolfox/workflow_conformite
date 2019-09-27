function transFormLibelleStatut(statutFnc) {
    var statut = "";
    switch (statutFnc) {
      case "initier":
        statut = "Initier";
        break;
      case "declarer":
        statut = "Déclarer";
        break;
      case "clotureProv":
        statut = "Cloturer provisoirement";
        break;
      case "routageCorrect":
        statut =
          "Routage correct (en attente d'action du responsable de traitement)";
        break;
      case "routageIncorrect":
        statut = "En attente d'une correction du routage";
        break;
      case "traiter":
        statut = "Traiter";
        break;
      case "criterCre":
        statut = "Critère créé";
        break;
      case "activer":
        statut = "Analyse Créée";
        break;
      default:
        statut = "";
    }
    return statut;
  }

  export default transFormLibelleStatut