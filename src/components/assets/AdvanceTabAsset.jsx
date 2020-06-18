import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

import ReactTable from 'react-table';
import "react-table/react-table.css";
import FilterCaseInsensitive from './filterInsensitive' ;

export default class AdvanceTabAsset extends React.Component
{

    constructor(props){

        super(props)
    }


render(){
    return(
        <>
                    <ReactTable
                    filterable={true}
                    defaultFilterMethod={FilterCaseInsensitive}
                    loading={!this.props.isLoaded}
                    minRows={5}
                    noDataText={(this.props.hasError) ? this.props.errorMessage : "Aucune donnée"}
                    data={this.props.dataArray}
                    columns={this.props.dataColumn}
                    previousText={"Précedent"}
                    nextText={"Suivant"}
                    rowsText={"Ligne(s)"}
                    ofText={"sur "}
                    loadingText="Chargement en cours..."
                    getTrProps={this.props.onclickFunction}
                    // getTrProps={(state, rowInfo) => {
                    //   if (rowInfo && rowInfo.row) {
                    //     return {
                    //       onClick: (e) => {
                    //        this.props.onclickFunction(rowInfo)
                    //       },
                    //     //   style: {
                    //     //     background: rowInfo.index === this.state.selectedAnalyseIndex ? '#cd511f' : 'white',
                    //     //     color: rowInfo.index === this.state.selectedAnalyseIndex ? 'white' : 'black'
                    //     //   }
                          
                    //     }
                    //   } else {
                    //     return {}
                    //   }
                    // }} 
                    />

        </>
    )

}


}

// //ONCLICK_FUNCTION 
// e.preventDefault();
// this.setState({
//   //PAY ATTENTION 
//   selectedAnalyseIndex: rowInfo.index,
//   selectedAnalyse: rowInfo.original.libelleAt,
//   getRow: rowInfo,
//   acteurTraitant: rowInfo.original.nomPrenom,
//   idActeur: rowInfo.original.idActeur,
//   cause: rowInfo.original.cause,
//   correction: rowInfo.original.correction,
//   echeance: rowInfo.original.echeance,
//   echeanceActionCorrective :rowInfo.original.echeanceActionCorrective,
//   actionCorrective: rowInfo.original.actionCorrective
// });
// console.log(rowInfo.original);
// this.toggleResultModal();


// props list

/*


*/


// getTrProps={()}
// getTrProps={(state, rowInfo) => {
//     if (rowInfo && rowInfo.row) {
//       return {
//         onClick: (e) => {
//          this.props.onclickFunction(rowInfo)
//         },
//         style: {
//           background: rowInfo.index === this.state.selectedAnalyseIndex ? '#cd511f' : 'white',
//           color: rowInfo.index === this.state.selectedAnalyseIndex ? 'white' : 'black'
//         }
        
//       }
//     } else {
//       return {}
//     }
//   }}