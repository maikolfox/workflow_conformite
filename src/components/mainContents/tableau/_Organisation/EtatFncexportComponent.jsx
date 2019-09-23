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
            <ExcelFile alignment={{wrapText:true}} filename={this.props.fileName}  element={this.props.boutton}>
                <ExcelSheet data={this.props.data} name="Employees">
                    <ExcelColumn label="Action corrective" value="actionCorrective"/>
                    <ExcelColumn label="Cause" value="cause"/>
                    <ExcelColumn label="Qualification" value="qualification"/>
                    <ExcelColumn alignment={{wrapText:true}} label="Description FNC" value="descriptionFNC"/>
                    <ExcelColumn label="Marital Status"
                                 value={(col) => col.is_married ? "Married" :  1 ?  2:    "Single" }/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
} 

