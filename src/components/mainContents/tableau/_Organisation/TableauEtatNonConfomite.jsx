import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPen, faPlusCircle, faBan, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//import Loader from 'react-loader-spinner'
import ReactTable from 'react-table';
import ReactTableActeur from 'react-table';
import TabSwitcher, { Tab, TabPanel } from "./TabSwitcher/TabSwitcher";
import findDuplicates from "find-duplicates";
import "react-table/react-table.css";
//import MediaAsset from '../../../assets/MediaAsset'
//import CorrectionRoutageModal from "../modals/CorrectionRoutageModal";
//import Authorization from '../../Authorization_401';
//import ActeurList from '../../../assets/ActeurData';
//import ActeurColumns from '../../../assets/ActeurColumns';
//import Columns from '../../../assets/ColumDetailsFnc';
//import '../tableau.css';
//import SelectComp from 'react-select';
//import ActeurListSelect from '../../../assets/ActeurDataSelectList';


import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Form,
    FormText,
    Label,
    Row,
    Col,
    Collapse,
    // Progress,
    Container
} from "reactstrap";


export default class TableauEtatsNonConformite extends React.Component {


    constructor(props) {

        super(props);
        this.state = {

            isLoaded: true,
            responseToPost: [],
            hasError: false,
            errorMessage: null,
            unAutorize: false,
            dateArr :"",
            dateArrIsSet :"",
            dateDeb :"",
            dateDebIsSet :""
        }
        this.consultEtatFnc = this.consultEtatFnc.bind(this);
    }

    async consultEtatFnc() {
        await fetch("/get_etatFnc/fnc",{
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data":
          {
            "dateDeb":"2019-04-20",
		    "dateArr":"2019-10-20"
          }
        })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.data.responses.length === 0) {
                        alert("Aucune donnée enregistrée");
                        window.close();
                        this.setState({
                            isLoaded: true,
                            errorMessage: result.data.message,
                            hasError: false,
                            unAutorize: false,
                            responseToPost:[]
                        });
                    }
                    else {
                        const save_ = result.data.responses;
                        const duplicates = findDuplicates(save_, subject => {
                            return subject.numeroId;
                        });
                        console.log("duplicates",duplicates)
                        const aggData = [];
                        for (var i = 0; i < duplicates.length; i++) {
                            for (var j = 0; j < duplicates[i].length; j++) {
                                if (j !== 0){
                                     delete duplicates[i][j].descriptionFNC;
                                     delete duplicates[i][j].idSource;
                                     delete duplicates[i][j].statutFnc;
                                     delete duplicates[i][j].idProcessus;
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

                        aggData.map(el => {
                            filteredDATA.push(el);
                        })
                        this.setState({
                            isLoaded: true,
                            responseToPost: filteredDATA
                        });
                        console.log(this.state.responseToPost)
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
        const mkcEtataFNC_COLUMN = [
            {
                Header: 'Description',
                accessor: 'descriptionFNC',
                width: 696,
                style: { 'white-space': 'unset' }
            },
            {
                Header: 'Code processus',
                accessor: 'idProcessus',
                width: 180,
                style: { 'white-space': 'unset' }
            },
            {
                Header: 'Echeance',
                accessor: 'echeanceFnc',
                width: 180,
                style: { 'white-space': 'unset' }
            },

            {
                Header: 'Code source',
                accessor: 'idSource',
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
                Header: 'Echeances action',
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
                Header: 'Date cloture provisoire',
                accessor: 'dateCloturePro',
                width: 180,
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
                    <FormGroup>
                        <Row>
                            <Label for="exampleEmail" md={4}>Début</Label>
                            <Col md={{ size: 4, order: 1, }}>
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
                            {/**PROCESSUS */}
                            <Label for="exampleEmail" md={6}>Fin</Label>
                            <Col md={{ size: 4, order: 2 }}>
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
                            <Col md={{ size: 4, order: 3 }}> <Button disabled={!(this.state.dateArrIsSet&&this.state.dateDebIsSet)} onClick={this.consultEtatFnc}>Valider</Button></Col>
                        </Row>
                    </FormGroup>
                </Form>
            </Row>
            <Row>
            </Row>
                <ReactTableActeur
                    filterable={true}
                    pivotBy={['numeroId']}
                    //  defaultFilterMethod={FilterCaseInsensitive}
                    minRows={5}
                    noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucun etat recuperé"}
                    data={this.state.responseToPost}
                    columns={mkcEtataFNC_COLUMN}
                    previousText={"Précedent"}
                    nextText={"Suivant"}
                    rowsText={"Ligne(s)"}
                    ofText={"sur "}
                    loadingText="Chargement en cours..."
                    loading={!(this.state.isLoaded)}
                />
        </React.Fragment>
        )
    }

}