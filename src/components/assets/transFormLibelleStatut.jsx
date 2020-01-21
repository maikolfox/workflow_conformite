function transFormLibelleStatut(statutFnc) {
    var statut = "";
    switch (statutFnc) {
      case "initier":
        statut = "Initiée";
        break;
      case "initierBis":
          statut = "Efficacité insatisfaisante";
          break;
      case "cloturer":
        statut = "Clôturée";
        break;
      case "declarer":
        statut = "Déclarée";
        break;
      case "clotureProv":
        statut = "Clôturée provisoirement";
        break;
      case "routageCorrect":
        statut =
          "Routage correct (en attente d'action du responsable de traitement)";
        break;
      case "routageIncorrect":
        statut = "En attente d'une correction du routage";
        break;
      case "traiter":
        statut = "Traitée";
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