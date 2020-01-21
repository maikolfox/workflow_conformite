
import React from 'react';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faDownload } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//import Loader from 'react-loader-spinner'
import ReactTableEtatFnc from 'react-table';
import findDuplicates from "find-duplicates";
import "react-table/react-table.css";
//import MediaAsset from '../../../assets/MediaAsset'
//import CorrectionRoutageModal from "../modals/CorrectionRoutageModal";
//import Authorization from '../../Authorization_401';
//import ActeurList from '../../../assets/ActeurData';
//import ActeurColumns from '../../../assets/ActeurColumns';
//import Columns from '../../../assets/ColumDetailsFnc';
import '../tableau.css';
//import SelectComp from 'react-select';
//import ActeurListSelect from '../../../assets/ActeurDataSelectList';
import MainDataExport from "./MainDataExport_Suivi";
import FilterCaseInsensitive from '../../../assets/filterInsensitive';
import DateFormatTransform from '../../../assets/dateFormatTransform';
import DisplayNomPrenom from '../../../assets/displayNomPrenom';
import TransformLibelleStatut from "../../../assets/transFormLibelleStatut";
import ConfigUrl from '../../../assets/ConfigUrl'
import Auth from '../../../assets/Auth';
import StripedAsset from '../../../assets/stripedAsset'


import {
    Button,
    Input,
    FormGroup,
    Form,
    FormText,
    Label,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody
    // Collapse,
    // // Progress,
    // Container
} from "reactstrap";

export default class TableauEtatsNonConformite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            isLoadedModal: true,
            responseToPost: [],
            responsePlanAction:[],
            hasError: false,
            errorMessage: null,
            unAutorize: false,
            dateArr: null,
            dateArrIsSet: false,
            dateDeb: null,
            dateDebIsSet: false,
            selected: "",
            toggleModal: false,
            numeroId:"",
            idFnc:""
        }
        this.consultEtatFnc = this.consultEtatFnc.bind(this);
        this.toggle = this.toggle.bind(this);
        this.consultPlanDactionByANalyse=this.consultPlanDactionByANalyse.bind(this);
    }

    toggle() {
        this.setState(prevState => ({ toggleModal: !prevState.toggleModal, selected: !prevState.selected }))
    }

    async consultPlanDactionByANalyse(idFNc){
        this.setState({
            isLoadedModal: false
        });
        await fetch(ConfigUrl.basePath + "/getAna_traitement_byidFnc/fnc", {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "data":
                {
                    "idFnc": idFNc
                  
                }
            })
        }).then(res => res.json())
        .then(
            (result) => {
                console.log(result.data.responses);
                if (result.data.responses.length === 0) 
                {
                    alert("Aucun plan d'action pour la fiche selectionnée");
                    this.setState({
                        errorMessage: result.data.message,
                        hasError: false,
                        responsePlanAction: []
                    });
                }
                else {
                    console.log("responses from backend:", result.data.responses)
                    const save_ = result.data.responses;
                    //reformater certains champs

                    // eslint-disable-next-line
                    save_.map(el => {
                        el.idActeur=DisplayNomPrenom(el.idActeur);
                        el.statutEva = TransformLibelleStatut(el.statutEva);
                        el.statut = TransformLibelleStatut(el.statut);
                        el.statutFnc = TransformLibelleStatut(el.statutFnc);
                        el.echeances = DateFormatTransform(el.echeances);
                        el.echeances2 = DateFormatTransform(el.echeances2);
                        el.dateCreationAnalyse=DateFormatTransform(el.dateCreationAnalyse);
                    })
                    
                    console.log("response to post :", save_)
                    this.setState({responsePlanAction:save_});
                }
            },
            (error) => {
                console.log("124", error.message);
                alert("Erreur lors de la communication avec le serveur , contacter les administrateur si le problème persiste");
                this.setState({
                    isLoadedModal: true,
                    errorMessage: error.message,
                    hasError: true
                });
            }).finally(()=>{
                this.setState({
                    isLoadedModal: true,
                });
            })

    }
    async consultEtatFnc() {
        this.setState({
            isLoaded: true
        });
        await fetch(ConfigUrl.basePath + "/suivi_plan_action_parActeur/fnc", {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "data":
                {
                    "dateDeb": this.state.dateDeb,
                    "dateArr": this.state.dateArr,
                    "idActeurDelegataire": Auth.getUsername()
                }
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.data.responses.length === 0) {
                        alert("Aucun plan d'action créer  durant la période selectionnée");
                        this.setState({
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
                        console.log("responses from backend:", result.data.responses)
                        const save_ = result.data.responses;
                        //reformater certains champs

                        // eslint-disable-next-line
                        save_.map(el => {
                            el.echeances = DateFormatTransform(el.echeances);
                            //el.idActeur = DisplayNomPrenom(el.idActeur);
                            //el.idActeurDelegataire = DisplayNomPrenom(el.idActeurDelegataire);
                            el.statutEva = TransformLibelleStatut(el.statutEva);
                            el.statut = TransformLibelleStatut(el.statut);
                            el.statutFnc = TransformLibelleStatut(el.statutFnc);
                            el.dateCloturePro = DateFormatTransform(el.dateCloturePro);
                        })
                        // // PERMET D'eviter la redondance
                        // const duplicates = findDuplicates(save_, subject => {
                        //     return subject.numeroId;
                        // });
                        // console.log("duplicates", duplicates)
                        // const aggData = [];
                        // for (var i = 0; i < duplicates.length; i++) {
                        //     for (var j = 0; j < duplicates[i].length; j++) {
                        //         if (j !== 0) {
                        //             duplicates[i][j].descriptionFNC = "";
                        //             duplicates[i][j].libelleSource = "";
                        //             duplicates[i][j].statutFnc = "";
                        //             duplicates[i][j].libelleProcesus = "";
                        //             duplicates[i][j].dateDeclaration = "";
                        //             aggData.push(duplicates[i][j]);
                        //         }
                        //     }
                        // }
                        // const filteredDATA = save_.reduce((acc, current) => {
                        //     const x = acc.find(item => item.numeroId === current.numeroId);
                        //     if (!x) {
                        //         return acc.concat([current]);
                        //     } else {
                        //         return acc;
                        //     }
                        // }, []);
                        // // eslint-disable-next-line
                        // aggData.map(el => {
                        //     filteredDATA.push(el);
                        // });
                        //console.log("filtered data", filteredDATA)

                        //fin find duplicate

                        this.setState({
                            //responseToPost: filteredDATA
                            responseToPost: save_
                        });
                        console.log("response to post :", save_)
                    }
                },
                (error) => {
                    console.log("124", error.message);
                    alert("Erreur lors de la communication avec le serveur , contacter les administrateur si le problème persiste");
                    this.setState({
                        errorMessage: error.message,
                        hasError: true
                    });
                }).finally(()=>{
                    this.setState({
                        isLoaded: true,
                    });
                })
    }
    componentDidMount() {

    }

    render() {
        // const currentRecords = this.selectTable.getResolvedState().sortedData;

        const plandaction_COLUMN = [
            //TODO RETRIEVE LATER
             { 
                 Header: () => (
                    <div style={{ fontSize: "14px" }}>Acteur traitant</div>
                ),
                 accessor: 'idActeur',
                 style: { 'white-space': 'unset' },
                 Cell: row => (<div  style={{ fontSize: "13px", width: "100%" }}>{row.value}</div>)
             },
             {  
                Header: () => (
                    <div style={{ fontSize: "14px" }}>Action corrective</div>
                ),
                 accessor: 'actionCorrective',
                 width: 180,
                 style: { 'white-space': 'unset' },
                 Cell: row => (<div  style={{ fontSize: "13px", width: "100%" }}>{row.value}</div>)

             },
             {
                Header: () => (
                    <div style={{ fontSize: "14px" }}>Correction</div>
                ),
                 accessor: 'actionCorrective',
                 width: 180,
                 style: { 'white-space': 'unset' },
                 Cell: row => (<div  style={{ fontSize: "13px", width: "100%" }}>{row.value}</div>)
             },
             {
                 Header: 'Echeances actions',
                 Header: () => (
                    <div style={{ fontSize: "14px" }}>Echeances actions</div>
                ),
                 accessor: 'echeances',
                 width: 180,
                 style: { 'white-space': 'unset' },
                 Cell: row => (<div  style={{ fontSize: "13px", width: "100%" }}>{row.value}</div>)

             },
             {
                Header: () => (
                   <div style={{ fontSize: "14px" }}>Echeances correction</div>
               ),
                accessor: 'echeances2',
                width: 180,
                style: { 'white-space': 'unset' },
                Cell: row => (<div  style={{ fontSize: "13px", width: "100%" }}>{row.value}</div>)

            },
               {
                 Header: () => (
                    <div style={{ fontSize: "14px" }}>Cause</div>
                ),
                 accessor: 'cause',
                 width: 180,
                 style: { 'white-space': 'unset' },
                 Cell: row => (<div  style={{ fontSize: "13px", width: "100%" }}>{row.value}</div>)

             },   
        ]


        const mkcEtataFNC_COLUMN = [
            {
                Header: () => (
                    <div style={{ fontSize: "14px" }}>Numéro de fiche</div>
                ),
                accessor: 'numeroId',
                width: 150,
                style: { 'white-space': 'unset' },
                Cell: row => (<div style={{ fontSize: "13px", width: "100%" }}>{row.value}<div></div></div>)
            },
            {
                Header: () => (
                    <div style={{ fontSize: "14px" }}>Description</div>
                ),
                accessor: 'descriptionFNC',
                width: 450,
                style: { 'white-space': 'unset' },
                Cell: row => (<div style={{ fontSize: "13px", width: "100%" }}>{row.value}<div></div></div>)

            },

            {
                Header: () => (
                    <div style={{ fontSize: "14px" }}>Date de déclaration</div>
                ),
                accessor: 'dateDeclaration',
                width: 160,
                style: { 'white-space': 'unset' },
                Cell: row => (<div style={{ fontSize: "13px", width: "100%" }}>{row.value}<div></div></div>)

            },
            {
                Header: () => (
                    <div style={{ fontSize: "14px" }}>Heure de déclaration</div>
                ),
                accessor: 'dateTime',
                width: 150,
                style: { 'white-space': 'unset' },
                Cell: row => (<div style={{ fontSize: "13px", width: "100%" }}>{row.value}<div></div></div>)
            },

            {
                Header: () => (
                    <div style={{ fontSize: "14px" }}>Processus</div>
                ),
                accessor: 'libelleProcesus',
                width: 150,
                style: { 'white-space': 'unset' },
                Cell: row => (<div style={{ fontSize: "13px", width: "100%" }}>{row.value}<div></div></div>)
            },
            {
                Header: () => (
                    <div style={{ fontSize: "14px" }}>Source</div>
                ),
                accessor: 'libelleSource',
                width: 180,
                style: { 'white-space': 'unset' },
                Cell: row => (<React.Fragment className="rt-td" style={{ fontSize: "13px", width: "100%", backgroundColor: `${row.index % 2 ? "red" : "#ffff"}` }}>{row.value}</React.Fragment>)

            },
            {
                Header: () => (
                    <div style={{ fontSize: "14px" }}>Statut fnc</div>
                ),
                accessor: 'statutFnc',
                width: 150,
                style: { 'white-space': 'unset' },
                Cell: row => (<div style={{ fontSize: "13px", width: "100%" }}>{row.value}<div></div></div>)
            }
        ]


        return (<React.Fragment>
            <Row style={{ marginLeft: '2px' }}><small>Definissez une periode pour consulter les plans d'action créés pendant celle-ci </small></Row>
            <br></br>
            <Row style={{ marginLeft: '2px' }}>
                <Form>
                    <FormGroup inline>
                        <Row >
                            {/**DEBUT */}
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
                            {/**FIN */}
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
                            <Col md={{ size: 4, order: 3 }}><Button disabled={!(this.state.dateArrIsSet && this.state.dateDebIsSet)} onClick={this.consultEtatFnc}>Valider</Button></Col>
                            {/* <Col md={{ size: 3, order: 4 }}><MainDataExport etatFnc={this.state.responseToPost} fileName={"Etat fnc du"+this.state.dateDeb+"_"+this.state.dateArr}/></Col> */}
                        </Row>

                    </FormGroup>
                </Form>
            </Row>
            <Row>
            </Row>
            <div style={{ cursor: "pointer", width: "85%", height: "90%" }}>
                <ReactTableEtatFnc
                    filterable={true}

                    className="-striped -highlight"
                    // pivotBy={['numeroId']}
                    // className="styleZ"
                    minRows={5}
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                onClick: (e) => {
                                    {
                                        // e.preventDefault();
                                        // this.setState({
                                        //   selected: rowInfo.index,
                                        //   getRow: rowInfo,
                                        //   idProcessus: rowInfo.original.idProcessus,
                                        //   descriptionFnc: rowInfo.original.descriptionFnc,
                                        //   idFnc:rowInfo.original.idFnc,
                                        // });

                                        this.setState({
                                            selected: rowInfo.index,
                                            getRow: rowInfo,
                                            idProcessus: rowInfo.original.idProcessus,
                                            numeroId: rowInfo.original.numeroId,
                                            descriptionFnc: rowInfo.original.descriptionFnc,
                                            idFnc: rowInfo.original.idFnc,
                                        });
                                        console.log(rowInfo.original.idFnc);
                                        this.consultPlanDactionByANalyse(rowInfo.original.idFnc);
                                        this.toggle();

                                    }
                                },
                                // style: StripedAsset(rowInfo.index,this.state.selected)
                            }
                        } else {
                            return {}
                        }
                    }}
                    defaultFilterMethod={FilterCaseInsensitive}
                    noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucune analyse recupéré"}
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
            </div>
            <Modal isOpen={this.state.toggleModal}
                toggle={this.toggle}
                size="lg"
                style={{ maxWidth: '80%', width: '80%' }}
                centered
                backdrop="static">
                <ModalHeader toggle={this.toggle}>
                    Plan d'action par FNC
                      </ModalHeader>
                <ModalBody>
                    <h1 style={{ textAlign: "center" }}>FICHE N° {this.state.numeroId} </h1>
                    <div>
                        <ReactTableEtatFnc
                            filterable={true}
                            // pivotBy={['numeroId']}
                            // className="styleZ"
                            className="-striped -highlight"
                            minRows={5}
                            getTrProps={(state, rowInfo) => {
                                if (rowInfo && rowInfo.row) {
                                    return {
                                        onClick: (e) => {
                                            {
                                                console.log("click on ",rowInfo.original.idFnc);
                                            }
                                        },
                                        //  style: {
                                        //      background: rowInfo.index ===this.state.selected  ? '#e0dcdc' : '',
                                        //      color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                        //  }
                                    }
                                } else {
                                    return {}
                                }
                            }}
                            defaultFilterMethod={FilterCaseInsensitive}
                            noDataText={(this.state.hasError) ? "Erreur lors de la récupération des données,contactez les administrateurs !" : "Aucun plan d'action recupéré"}
                            data={this.state.responsePlanAction}
                            columns={plandaction_COLUMN}
                            previousText={"Précedent"}
                            nextText={"Suivant"}
                            rowsText={"Ligne(s)"}
                            ofText={"sur "}
                            loadingText="Chargement en cours..."
                            loading={!(this.state.isLoadedModal)}
                        // ref={(r) => {
                        //     this.selectTable = r;
                        //   }}
                        />
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
        )
    }

}