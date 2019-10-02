function transFormEcheance(echeances) 
{
  if (echeances===null) return "" 

  if(echeances.length>10){
     echeances= echeances.split("T")[0];
    return echeances
      .split("-")
      .reverse()
      .join("-");
  }
  else{
  
  return echeances
      .split("-")
      .reverse()
      .join("-");
  }

}
  export default  transFormEcheance;