
import React from 'react';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faDownload } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Table } from 'reactstrap';
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//import Loader from 'react-loader-spinner';
//import MediaAsset from '../../../assets/MediaAsset'
//import CorrectionRoutageModal from "../modals/CorrectionRoutageModal";
//import Authorization from '../../Authorization_401';
//import ActeurList from '../../../assets/ActeurData';
//import ActeurColumns from '../../../assets/ActeurColumns';
//import Columns from '../../../assets/ColumDetailsFnc';
//import '../tableau.css';
//import SelectComp from 'react-select';
//import ActeurListSelect from '../../../assets/ActeurDataSelectList';
import ReactTableEtatFnc from 'react-table';
import findDuplicates from "find-duplicates";
import "react-table/react-table.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MainDataExport from "./MainDataExport";
import FilterCaseInsensitive from '../../../assets/filterInsensitive';
import DateFormatTransform from '../../../assets/dateFormatTransform';
import DisplayNomPrenom from '../../../assets/displayNomPrenom';
import TransformLibelleStatut from "../../../assets/transFormLibelleStatut";
import ConfigUrl from '../../../assets/ConfigUrl'

import {
    Button,
    Input,
    FormGroup,
    Form,
    FormText,
    Label,
    Row,
    Col,
    // Collapse,
    // // Progress,
    // Container
} from "reactstrap";

export default class AssetFncEtats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            responseToPost: [],
            hasError: false,
            errorMessage: null,
            unAutorize: false,
            dateArr:null,
            dateArrIsSet:false,
            dateDeb:null ,
            dateDebIsSet : false
        }
        this.consultEtatFnc = this.consultEtatFnc.bind(this);
    }


    async consultEtatFnc() {
        await fetch(ConfigUrl.basePath+"/get_etatFnc/fnc",{
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data":
          {
            "dateDeb":this.state.dateDeb,
		    "dateArr":this.state.dateArr
          }
        })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.data.responses.length === 0) {
                        alert("Aucune FNC déclarée  durant la période selectionnée");
                        this.setState({
                            isLoaded: true,
                            errorMessage: result.data.message,
                            hasError: false,
                            unAutorize: false,
                            responseToPost: []
                        });
                    }
                    else {
                        //RETROUVER LES FNC AVEC PLUSIEURS CAUSE, 
                        //CELA EVITE LA REDONDANCE DES INFORMATIONS 
                        //INUTILES SUR PLUSIEURS LIGNES
                        console.log("responses from backend:",result.data.responses)
                        const save_ = result.data.responses;
                        //reformater certains champs

                        // eslint-disable-next-line
                        save_.map(el => {
                            el.echeances = DateFormatTransform(el.echeances);
                           // el.idActeur = DisplayNomPrenom(el.idActeur);
                            el.idActeurDelegataire = DisplayNomPrenom(el.idActeurDelegataire);
                            el.statutEva = TransformLibelleStatut(el.statutEva);
                            el.statut = TransformLibelleStatut(el.statut);
                            el.statutFnc = TransformLibelleStatut(el.statutFnc);
                            el.dateCloturePro= DateFormatTransform(el.dateCloturePro);
                        })
                       // PERMET D'eviter la redondance
                         const duplicates = findDuplicates(save_, subject => {
                             return subject.numeroId;
                         });
                         console.log("duplicates", duplicates)
                         const aggData = [];
                         for (var i = 0; i < duplicates.length; i++) {
                             for (var j = 0; j < duplicates[i].length; j++) {
                                 if (j !== 0) {
                                      duplicates[i][j].descriptionFNC="";
                                      duplicates[i][j].libelleSource="";
                                      duplicates[i][j].statutFnc="";
                                      duplicates[i][j].libelleProcesus="";
                                      duplicates[i][j].dateDeclaration="";
                                     aggData.push(duplicates[i][j]);
                                 }
                             }
                         }
                         const filteredDATA = save_.reduce((acc, current) => {
                             const x = acc.find(item => item.numeroId === current.numeroId);
                             if (!x) {
                                 return acc.concat([current]);
                             } else {
                                 return acc;
                             }
                         }, []);
                         // eslint-disable-next-line
                         aggData.map(el => {
                             filteredDATA.push(el);
                         });
                        console.log("filtered data" ,filteredDATA)
                        this.setState({
                            isLoaded: true,
                            responseToPost: filteredDATA
                            //responseToPost: save_
                        });
                        console.log("response to post :",save_)
                    }
                },
                (error) => {
                    console.log("124", error.message);
                    alert("Erreur lors de la communication avec le serveur , contacter les administrateur si le problème persiste");
                    this.setState({
                        isLoaded: true,
                        errorMessage: error.message,
                        hasError: true
                    });
                })
    }
     componentDidMount() {

    }
  
    render() {
        // const currentRecords = this.selectTable.getResolvedState().sortedData;

        const mkcEtataFNC_COLUMN = [
            {
                Header: 'Description',
                accessor: 'descriptionFNC',
                width: 696,
                style: { 'white-space': 'unset' }
            },
        
            {
                Header: 'Date déclaration',
                accessor: 'dateDeclaration',
                width: 180,
                style: { 'white-space': 'unset' }
            },


            {
                Header: 'Processus',
                accessor: 'libelleProcesus',
                width: 180,
                style: { 'white-space': 'unset' }
            },
            {
                Header: 'Echeance',
                accessor: 'echeanceFnc',
                width: 180,
                style: { 'white-space': 'unset' }
            },
            // {
            //     Header: 'Code source',
            //     accessor: 'idSource',
            //     width: 180,
            //     style: { 'white-space': 'unset' }
            // },
            {
                Header: 'Source',
                accessor: 'libelleSource',
                width: 180,
                style: { 'white-space': 'unset' }
            },
            {
                Header: 'Numéro de fiche',
                accessor: 'numeroId',
                width: 250,
                style: { 'white-space': 'unset' }
            },
            {
                Header: 'Cause',
                accessor: 'cause',
                width: 380,
                style: { 'white-space': 'unset' },

            },
            {
                Header: 'Action corrective',
                accessor: 'actionCorrective',
                width: 180,
                style: { 'white-space': 'unset' }
            },
            {
                Header: 'Echeances actions',
                accessor: 'echeances',
                width: 180,
                style: { 'white-space': 'unset' }
            },
            {
                Header: 'Statut effacité',
                accessor: 'statutEva',
                width: 180,
                style: { 'white-space': 'unset' }
            },
            {
                Header: 'Acteur traitant',
                accessor: 'idActeur',
                width: 350,
                style: { 'white-space': 'unset' }
            },
            {
                Header: 'Responsable traitement',
                accessor: 'idActeurDelegataire',
                width: 280,
                style: { 'white-space': 'unset' }
            },
            {
                Header: 'Date de cloture provisoire',
                accessor: 'dateCloturePro',
                width: 200,
                style: { 'white-space': 'unset' }
            },
            {
                Header: 'Statut fnc',
                accessor: 'statutFnc',
                width: 180,
                style: { 'white-space': 'unset' }
            }
        ]
        return (<React.Fragment>
            <Row style={{marginLeft:'2px'}}><small>Definissez une période pour la génération des états</small></Row>
            <br></br>
            <Row style={{marginLeft:'2px'}}>
                <Form>
                    <FormGroup inline>
                        <Row >
                            {/**DEBUT */}
                            <Label for="exampleEmail" md={4}>Début</Label>
                            <Col md={{ size: 3, order: 1, }}>
                                <Input valid={this.state.dateDebIsSet} //invalid={!this.state.qualificationIsSet}
                                    type="date"
                                    id="selectAgence"
                                    name="selectbasic"
                                    value={this.state.dateDeb}
                                    onChange={e => {
                                        this.setState({ dateDeb: e.target.value })
                                        if (e.target.value !== null && e.target.value !== "") {
                                            this.setState({ dateDebIsSet: true })
                                        }
                                        else { this.setState({ dateDebIsSet: false }) }
                                    }}>
                                </Input>
                                <FormText hidden={this.state.dateDebIsSet}>Date début</FormText>
                            </Col>
                            {/**FIN */}
                            <Label for="exampleEmail" md={6}>Fin</Label>
                            <Col md={{ size: 3, order: 2 }}>
                                <Input valid={this.state.dateArr} //invalid={!this.state.idProcessusIsSet}
                                    type="date"
                                    id="selectAgence"
                                    name="selectbasic"
                                    min={this.state.dateDeb}
                                    value={this.state.dateArr}
                                    onChange={e => {
                                        this.setState({ dateArr: e.target.value })
                                        if (e.target.value !== null && e.target.value !== "") {
                                            this.setState({ dateArrIsSet: true })
                                        }
                                        else { this.setState({ dateArrIsSet: false }) }
                                    }
                                    }>
                                </Input>
                                <FormText hidden={this.state.dateArrIsSet}>Date fin</FormText>
                            </Col>
                            <Col md={{ size: 3, order: 3 }}><Button disabled={!(this.state.dateArrIsSet&&this.state.dateDebIsSet)} onClick={this.consultEtatFnc}>Valider</Button></Col>
                            <Col md={{ size: 3, order: 4 }}><MainDataExport etatFnc={this.state.responseToPost} fileName={"Etat fnc du"+this.state.dateDeb+"_"+this.state.dateArr}/></Col>
                        </Row>
                        
                    </FormGroup>
                </Form>
            </Row>
            <Row>
            </Row>
                <ReactTableEtatFnc
                    filterable={true}
                    pivotBy={['numeroId']}
                    //  defaultFilterMethod={FilterCaseInsensitive}
                    minRows={5}
                    defaultFilterMethod={FilterCaseInsensitive}
                    noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucun etat recupéré"}
                    data={this.state.responseToPost}
                    columns={mkcEtataFNC_COLUMN}
                    previousText={"Précedent"}
                    nextText={"Suivant"}
                    rowsText={"Ligne(s)"}
                    ofText={"sur "}
                    loadingText="Chargement en cours..."
                    loading={!(this.state.isLoaded)}
                    // ref={(r) => {
                    //     this.selectTable = r;
                    //   }}
                />
        </React.Fragment>
        )
    }

}