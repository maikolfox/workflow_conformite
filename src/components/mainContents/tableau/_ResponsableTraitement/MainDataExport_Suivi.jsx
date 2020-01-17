import React from "react";
import LibelleData, {libelleColor} from "./LibelleData";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "bootstrap/dist/css/bootstrap.min.css";

var tabNumId = [];
var doStriped = true;

export default class TabEtat extends React.Component {
  constructor(props) {
    super(props);

   
    this.functionStripedTable = this.functionStripedTable.bind(this);
  }

  


  functionStripedTable(numeroId, tabId, index) {
    if (index === 0) return doStriped;
    else {
      if (numeroId !== tabId[index - 1]) {
        doStriped = !doStriped;
        return doStriped;
      }

      return true;
    }
  }
  

  renderTableData() {
    return this.props.etatFnc.map((etatFncs, index) => {
      const {
        numeroId,
        descriptionFNC,
        echeanceFnc,
        dateDeclaration,
        libelleSource,
        libelleProcesus,
        correction,
        actionCorrective,
        cause,
        echeances,
        statut,
        idActeur,
        idActeurDelegataire,
        dateClotureDef,
        dateFinAnalyse,
        statutFnc,
        statutEva,
        
      } = etatFncs; //destructuring 
      //permet d'acceder directement aux champs 
      tabNumId.push(numeroId);
      var td1;
      if (index > 1) {
        td1 = numeroId !== tabNumId[index - 1] ? <td>{numeroId}</td> : <td />;
      } else {
        td1 = <td>{numeroId}</td>;
      }
      return (
        <tr
          bgcolor={
            this.functionStripedTable(numeroId, tabNumId, index)
              ? "#f2f2f2"
              : "#ddd"
          }
          key={index}
        >
          {td1}
          {/**numero de fiche */}
          <td style={{ width: "500px"}}>{libelleProcesus}</td>
          {/**Processus */}
          <td>{libelleSource}</td>
          {/**Source*/}
          <td style={{ width: "500px" }}>{descriptionFNC}</td>
          {/**Description fnc */}
          <td>{correction}</td>
          {/**Correction */}
          <td>{actionCorrective}</td>
          {/**Action corrective*/}
          <td>{cause}</td>
          {/**Cause */}
          <td>{echeances}</td>
          {/**numero de fiche */}
          <td>{dateFinAnalyse}</td>
          {/**Echeances actions*/}
          <td>{statut}</td>
          <td>{idActeur}</td>
          <td>{idActeurDelegataire}</td>
          <td>{dateDeclaration}</td>
          <td>{dateClotureDef}</td>
          <td>{echeanceFnc}</td>
          <td>{statutFnc}</td>
          <td>{statutEva}</td>
          {/* 
          <td>{echeanceFnc}</td>
          <td>{libelleSource}</td>
          <td>{libelleSource}</td>
          <td>{numeroId}</td>
          <td>{descriptionFNC}</td>
          <td>{echeanceFnc}</td>
          <td>{libelleSource}</td>
          <td>{libelleSource}</td> */}
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.entries(LibelleData);
    return header.map((key, index) => {
      return (
        <th
          key={index}
          style={{
            backgroundColor: (libelleColor[key[0]] === undefined ||  libelleColor[key[0]]===null) ? "#d9531e" : libelleColor[key[0]] ,
            border: "1px solid #0000",
            padding: "20px",
            width: "auto",
            fontSize:"1.3em"
          }}
        >
          {key[1]}
        </th>
      );
    });
  }

  render() {
    return (
      <div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="btn btn-danger"
          table="etatFnc"
          filename={this.props.fileName}
          sheet="Etat FNC"
          buttonText="Exporter les états"
        />
        <table hidden id="etatFnc">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}
