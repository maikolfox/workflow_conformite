import React from 'react';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faTrash, faPen, faPlusCircle, faBan, faEye } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//import Loader from 'react-loader-spinner'
import ReactTableEvaluationFnc from 'react-table';

import "react-table/react-table.css";
//import MediaAsset from '../../../assets/MediaAsset'
//import CorrectionRoutageModal from "../modals/CorrectionRoutageModal";
import TabSwitcher, { Tab, TabPanel } from "./TabSwitcher/TabSwitcher";
//import Authorization from '../../Authorization_401';
/*import ActeurList from '../../../assets/ActeurData';
import ActeurColumns from '../../../assets/ActeurColumns';
import Columns from '../../../assets/ColumDetailsFnc';
import CritereItem from './critereItem';*/
import '../tableau.css';
//import SelectComp from 'react-select';
//import ActeurListSelect from '../../../assets/ActeurDataSelectList';
import { evaluationColumn } from '../../../assets/evaluationColumn';
import FilterCaseInsensitive from '../../../assets/filterInsensitive';
import TransFormLibstat from '../../../assets/transFormLibelleStatut';
import dateFormat from '../../../assets/dateFormatTransform';
import Source from '../../../assets/Source';
//import Processus from '../../../asset/Processus';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    // Input,
    // FormGroup,
    // Form,
    // FormText,
    // Label,
    // Row,
    // Col,
    // Collapse,
    // Progress,
    //Container
} from "reactstrap";


export default class TableauEvaluationCritere extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                idFnc: '',
                numeroId: '',
                modal: '',

                selected: null,
                selectedActeur: null,
                selectedAnalyse: null,
                selectedAnalyseIndex: null,

                responseToPost: [],
                responseToAnalyseByID: [],
                isLoaded: '',
                getRow: '',
                idSource: '',
                idFamile: '',
                idProcessus: '',
                descriptionFnc: '',
                qualification: '',

                libelleSource: '',
                libelleFamile: '',
                libelleProcessus: '',


                correction: '',
                correctionIsSet: '',

                actionCorrective: '',
                actionCorrectiveIsSet: '',

                cause: '',
                causeIsSet: '',

                libelle: 1,

                idActeur: null,
                acteurTraitant: null,
                idActeurIsSet: false,

                nomPrenom: '',
                echeance: '',
                echeanceIsSet: false,
                isLoadedAna: false,
                hasError: '',
                errorMessage: '',
                responseSubmit: '',

                dataStruc: [],
                dsFncNbrAna: [],
                //selectedAnalyseIndex:null,
                //selectedAnalyse: null,

                critere: null,
                critereIsSet: false,

                selectedAnaCreIndex: null,
                selectedAnaCre: null,
                collapse: false,
                collapseDetail: false,

                criterObject: [],
                critere: "",
                echeanceCritere: "",
                echeanceCritereIsSet: false,
                id: null,
                unAutorize: false
            }
        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.currentDate = this.currentDate.bind(this);
        this.handleModifyAnalyse = this.handleModifyAnalyse.bind(this);
        this.handleValidModifyAnalyse = this.handleValidModifyAnalyse.bind(this);
        this.newAnalyse = this.newAnalyse.bind(this);
        //this.getAnalyse = this.getAnalyse.bind(this);
        this.switchDateFormat = this.switchDateFormat.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleCollapseDetail = this.toggleCollapseDetail.bind(this);
        this.getResultat_traitement = this.getResultat_traitement.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    };

    handleAdd() {
        const obj = {
            id: Date.now(),
            echeance: this.state.echeanceCritere,
            critere: this.state.critere
        };
        const auxTodo = this.state.criterObject;
        this.setState({
            criterObject: auxTodo.concat(obj),
            critere: "",
            echeanceCritere: "",
            critereIsSet: false,
            echeanceCritereIsSet: false
        });
        console.log(this.state.criterObject);
    }

    handleChange = id => {

        this.setState(prevState => {
            const update = prevState.criterObject.map(elem => {
                if (elem.id === id) {
                    elem.completed = !elem.completed;
                }
                return elem;
            });
            return {
                criterObject: update
            };
        });
        console.log(id);
    };

    handleDelete = id => {
        var update = [];
        console.log("id", id);
        this.setState(prevState => {
            prevState.criterObject.map(elem => {
                if (elem.id !== id) {
                    update.push(elem);
                }
            });
            return {
                criterObject: update
            };
        });

        console.log(this.state.criterObject);

    }


    toggleCollapse() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    toggleCollapseDetail() {
        this.setState(state => ({ collapseDetail: !state.collapseDetail }));
    }

    createAnalyse = event => {
        event.preventDefault();
        const newItem = {
            idFnc: this.state.idFnc,
            processus: this.state.idProcessus,
            actionCorrective: this.state.actionCorrective,
            correction: this.state.correction,
            echeance: this.state.echeance,
            cause: this.state.cause,
            /// TODO A RECUPERER DANS LA SESSION
            idActeurDelegataire: 'ahoueromeo@gmail.com',
            idActeur: this.state.idActeur,
            libelleAt: this.state.libelle

        };

        this.setState(prevState => ({
            dataStruc: prevState.dataStruc.concat(newItem),
            libelle: prevState.libelle + 1
        }));
        console.log(this.state.dataStruc);
    };


    currentDate() { //January is 0!
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.state.dataStruc);
        await fetch('/createCriter/fnc',
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "data": {
                        "mainData": {
                            "idAt": this.state.selectedAnaCre.id,
                            "critereObjet": this.state.criterObject
                        },
                        "notifData": {
                            "idActeur": this.state.idActeur,
                            "idResponsableTraitement": this.state.nomPrenom,
                            "numeroId": this.state.numeroId
                        }
                    }
                })
            }).then(res => res.json())
            .then(
                (result) => {

                    this.setState(prevState => ({
                        responseToPost: prevState.responseToPost.filter(item => {
                            return item.idFnc !== this.state.idFnc;
                        })
                    }))
                    this.setState({
                        isLoaded: true,
                        responseSubmit: result.data.message,
                        nestedModal: true,
                        criterObject: []
                    });
                    this.toggle();
                    this.consultFncInitier();
                },
                (error) => {
                    console.log("124", error.message);
                    alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
                    this.setState({
                        isLoaded: true,
                        errorMessage: error.message,
                        hasError: true,
                        criterObject: []

                    });

                });

    }

    handleModifyAnalyse = itemId => {
        const updatedItems = this.state.dataStruc.map(item => {
            if (itemId === item.libelleAnalyse) {
                this.setState({
                    cause: item.cause,
                    correction: item.correction,
                    echeance: item.echeance,
                    acteurTraitant: null,
                    idActeur: null,
                    libelleAnalyse: item.libelleAt,
                    actionCorrective: item.actionCorrective
                })
                console.log(item.cause);
            }
            return item;
        });

        this.setState({
            dataStruc: [].concat(updatedItems),
            selectedAnalyseIndex: null,
            selectedActeur: null
        });
    };

    handleValidModifyAnalyse = itemId => {
        const updatedItems = this.state.dataStruc.map(item => {
            if (itemId === item.libelleAt) {

                this.setState({
                    cause: item.cause,
                    correction: item.correction,
                    echeance: item.echeance,
                    acteurTraitant: null,
                    idActeur: null,
                    libelleAnalyse: item.libelleAt,
                    actionCorrective: item.actionCorrective
                })
                console.log(item.cause);
                item.actionCorrective = this.state.actionCorrective;
                item.correction = this.state.correction;
                item.echeance = this.state.echeance;
                item.cause = this.state.cause;
                //TODO RECUPERER LA VALEUR DANS LA SESSION
                item.idActeurDelegataire = 'ahoueromeo@gmail.com';
                item.idActeur = this.state.idActeur;
                item.libelleAnalyse = itemId;
            };

            return item;
        });
        this.setState(prevState => ({
            dataStruc: prevState.dataStruc.map(el => (el.libelleAt !== updatedItems.libelleAt ? { ...el } : updatedItems))
        }));
        fetch('/updateTraitement/fnc',
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "data":
                    {
                        "id": this.state.selectedAnaCre.id,
                        "idActeur": this.state.idActeur,
                        "actionCorrective": this.state.actionCorrective,
                        "correction": this.state.correction,
                        "cause": this.state.cause,
                        "echeances": this.state.echeance,
                        //TODO REPLACE LATER
                        "idActeurDelegataire": "maikol.ahoue@bridgebankgroup.com"
                    }
                })
            }).then(res => res.json())
            .then(
                (result) => {
                    this.setState(prevState => ({
                        responseToPost: prevState.responseToPost.filter(item => {
                            return item.idFnc !== this.state.idFnc;
                        })
                    }))
                    console.log(this.state.selected);
                    this.setState({
                        isLoaded: true,
                        responseSubmit: result.data.message,
                        nestedModal: true,
                    });
                    this.forceUpdate();
                },
                (error) => {
                    console.log("124", error.message);
                    alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
                    this.setState({
                        isLoaded: true,
                        errorMessage: error.message,
                        hasError: true
                    });
                });
        //this.toggle();

    }


    toggleNested() {
        this.setState({
            nestedModal: !this.state.nestedModal
        });
    }



    newAnalyse() {
        this.setState({
            correction: null,
            correctionIsSet: false,
            actionCorrective: null,
            actionCorrectiveIsSet: false,
            cause: null,
            causeIsSet: false,
            idActeur: null,
            acteurTraitant: null,
            idActeurIsSet: false,
            echeance: null,
            echeanceIsSet: false,
            critere: null,
            critereIsSet: false
        })

    }

    switchDateFormat = dat => {
        var d = new Date(dat);
        var month = d.getMonth() + 1;
        console.log(month);
        var year = d.getFullYear();
        var date = d.getDate();
        month = (month < 10) ? "0" + month : month;
        date = (date < 10) ? "0" + date : date;
        console.log("date ech  " + date + "/" + month + "/" + year);
        return date + "/" + month + "/" + year;

    }



    toggle() {
        this.setState({ valRoutage: null })
        this.setState(prevState => ({
            modal: !prevState.modal,
            selected: !prevState.selected,
            //add this and  init at null others selected*
            selectedAnalyse: !prevState.selectedAnalyse
        }));
        this.newAnalyse();
        this.setState({ libelle: 1 });
        this.setState({ dataStruc: [] });
        this.setState({ selectedAnaCreIndex: null })

    }

    async getResultat_traitement() {
        await fetch("/getResultat_traitement/fnc")
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.data.error === true || result.data.message === "Accès refuser !" || result.data.responses === null) {
                        alert(result.data.message);
                        this.setState({
                            isLoaded: true,
                            errorMessage: result.data.message,
                            hasError: false,
                            unAutorize: true
                        });
                    }
                    else {
                        var resultData= result.data.responses;
                       
                        resultData.map(el=>{
                                el.statutFnc=TransFormLibstat(el.statutFnc);
                                el.echeances=dateFormat(el.echeances)
                                el.libelleSource=Source.find(elmt=>{
                                    return el.idSource ===elmt.idSource
                                }).libelleSource
                                el.echeanceFnc=dateFormat(el.echeanceFnc)
                        })
                        this.setState({
                            isLoaded: true,
                            responseToPost: result.data.responses
                        });

                        console.log(this.state.responseToPost)
                    }
                },
                (error) => {
                    alert("Erreur lors de la communication avec le serveur , contacter les administrateur si le problème persiste");
                    this.setState({
                        isLoaded: true,
                        errorMessage: error.message,
                        hasError: true
                    });
                })
    }

    async componentDidMount() {
        this.getResultat_traitement()
    }
    render() {
        return (
            <React.Fragment>
        {/*REACT  MODAL FORM*/}
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
            size="lg"
            style={{maxWidth: '1600px', width: '80%'}}
            centered
            aria-labelledby="example-modal-sizes-title-lg"
            backdrop="static"
          >
            <ModalHeader toggle={this.toggle}>Demarrage de l'analyse</ModalHeader>
            <ModalBody>
              <TabSwitcher>
                     <TabPanel whenActive={1}>
                     <h1 style={{ textAlign: "center" }}>FICHE N° {this.state.numeroId} </h1>

                     </TabPanel>
              </TabSwitcher>
            </ModalBody>
            <ModalFooter>
            
                <Button color="danger" onClick={this.handleSubmit} disabled={(this.state.valRoutage=== true) || (this.state.dataStruc.length === 0 )}>
                {this.state.libelle > 2 ? "Soummettre les analyses":"Soummettre l'analyse" }  
            </Button>
             {/**Conditionnal bouton*/}
              <Button color="secondary" onClick={this.toggle}>
                Annuler
            </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.nestedModal}
            toggle={this.toggleNested}
            onClosed={this.state.closeAll ? this.toggle : undefined}
            centered
            size="sm">
            <ModalBody toggle={this.toggleNested} >{"response"}</ModalBody>
          </Modal>
        </div>

            <div style={{ cursor: 'pointer' }}>
                <ReactTableEvaluationFnc
                    filterable={true}
                    defaultFilterMethod={FilterCaseInsensitive}
                    minRows={5}
                    noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucun etat recupéré"}
                    data={this.state.responseToPost}
                    columns={evaluationColumn}
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                          return {
                            onClick: (e) => {         
                              e.preventDefault();
                              this.toggle();
                              this.setState({
                                selected: rowInfo.index,
                                getRow:rowInfo,
                                idProcessus:rowInfo.original.idProcessus,
                                numeroId:rowInfo.original.numeroId,
                                idFnc:rowInfo.original.idFnc,
                                descriptionFnc:rowInfo.original.descriptionFnc,         
                                famille:rowInfo.original.idFamille,
                                idSource:rowInfo.original.idSource,
                                idProcessusIsSet: true,
                                qualification:rowInfo.original.qualification,
                                qualificationIsSet:true,
                                familleIsSet:true,
                                idSourceIsSet:true,
                                descriptionFncIsSet:true,
                                libelleFamille:rowInfo.original.libelleFamille,
                                libelleSource:rowInfo.original.libelleSource ,
                                libelleProcessus:rowInfo.original.libelleProcesus
                              });
                              console.log(rowInfo.original);
                            },
                            style: {
                              background: rowInfo.index === this.state.selected ? '#cd511f' : 'white',
                              color: rowInfo.index === this.state.selected ? 'white' : 'black'
                            }}
                        }else{
                          return {}
                        }
                      }}
                    previousText={"Précedent"}
                    nextText={"Suivant"}
                    rowsText={"Ligne(s)"}
                    ofText={"sur "}
                    loadingText="Chargement en cours..."
                    loading={!(this.state.isLoaded)}
                />
                </div>
            </React.Fragment>)
    }

}