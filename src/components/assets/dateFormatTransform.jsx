function transFormEcheance(echeances) {
    return echeances
      .split("-")
      .reverse()
      .join("-");
  }

  export default  transFormEcheance;