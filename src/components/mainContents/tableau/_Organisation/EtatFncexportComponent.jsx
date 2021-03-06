import React from "react"; 
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  export default class ExportExcelEtatCom extends React.Component {
    constructor(props)
    {
      super(props)
    }
    render() {
        return (
            <ExcelFile  filename={this.props.fileName}  element={this.props.boutton}>
                <ExcelSheet  data={this.props.data} name="Etat FNC">
                    <ExcelColumn  label="Numéro  de la fiche de non-conformité" value="numeroId"/>
                    <ExcelColumn label="Action corrective" value="actionCorrective"/>
                    <ExcelColumn label="Cause" value="cause"/>
                    <ExcelColumn label="Qualification" value="qualification"/>
                    <ExcelColumn alignment={{wrapText:false}} label="Description FNC" value="descriptionFNC"/>
                    
                </ExcelSheet>
            </ExcelFile>
        );
    }
} 


