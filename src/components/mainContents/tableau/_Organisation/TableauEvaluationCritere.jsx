import React from 'react';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faTrash, faPen, faPlusCircle, faBan, faEye } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ReactTableEvaluationFnc from 'react-table';
import ReactTableRecapAnalyseAndTraite from 'react-table';

import "react-table/react-table.css";
import Loader from "../../../assets/Loader";

import TabSwitcher, { Tab, TabPanel } from "./TabSwitcher/TabSwitcher";
//import Authorization from '../../Authorization_401';
/*import ActeurList from '../../../assets/ActeurData';
import ActeurColumns from '../../../assets/ActeurColumns';
import Columns from '../../../assets/ColumDetailsFnc';
import CritereItem from './critereItem';*/
import '../tableau.css';
//import SelectComp from 'react-select';
//import ActeurListSelect from '../../../assets/ActeurDataSelectList';
import { evaluationColumn,data_column,data_details } from '../../../assets/evaluationColumn';
import FilterCaseInsensitive from '../../../assets/filterInsensitive';
import TransFormLibstat from '../../../assets/transFormLibelleStatut';
import dateFormat from '../../../assets/dateFormatTransform';
import Source from '../../../assets/Source';
import MediaAsset, { MediaAsset_subContent } from '../../../assets/MediaAsset'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CritereItemEval from "./critereItemEval";


//import Processus from '../../../asset/Processus';

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
    Col
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


                responseToPost: [],
                isLoaded: '',
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


                echeance: '',
                echeanceIsSet: false,
                isLoadedEva: false,
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
                unAutorize: false,
                resultatTraitement: "",
                libelleAnalyse: "",
                critereEvalData: [],
            }
        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggle = this.toggle.bind(this);
        this.newAnalyse = this.newAnalyse.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleCollapseDetail = this.toggleCollapseDetail.bind(this);
        this.getResultat_traitement = this.getResultat_traitement.bind(this);
        this.handleEvaluation = this.handleEvaluation.bind(this);
        this.get_criterebyid = this.get_criterebyid.bind(this);
    };

    handleEvaluation(id, value) {
        const update = this.state.criterObject.map(elem => {
            if (elem.id === id) {
                elem.evaluation = value
            }
            return elem
        })
        this.setState({
            criterObject: update
        })
        console.log(id)
    }

    toggleCollapse() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    toggleCollapseDetail() {
        this.setState(state => ({ collapseDetail: !state.collapseDetail }));
    }

    get_criterebyid = async e => {
        this.setState({ isLoaded: false })
        await fetch('/criterByAnalyseTraitement/fnc',
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "data": {
                        "idAt": e
                    }

                })
            }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        criterObject: result.data.responses,
                    });

                    console.log("critere object ------>", this.state.criterObject);
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

    toggle() {
        this.setState({ valRoutage: null })
        this.setState(prevState => ({
            modal: !prevState.modal,
            selected: !prevState.selected,
            //add this and  init at null others selected*
            // selectedAnalyse: !prevState.selectedAnalyse
        }));
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
                        var resultData = result.data.responses;
                        resultData.map(el => {
                            el.statutFnc = TransFormLibstat(el.statutFnc);
                            el.echeances = dateFormat(el.echeances)
                            el.libelleSource = Source.find(elmt => {
                                return el.idSource === elmt.idSource
                            }).libelleSource
                            el.echeanceFnc = dateFormat(el.echeanceFnc)
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
        const evalCritereItem = this.state.criterObject.map(item => (
            <CritereItemEval
                key={item.key}
                item={item}
                handleEvaluation={this.handleEvaluation}
            />

        ))


        return (
            <React.Fragment>
                <div>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                        size="lg"
                        style={{ maxWidth: '1600px', width: '80%' }}
                        centered
                        aria-labelledby="example-modal-sizes-title-lg"
                        backdrop="static">
                        <ModalHeader toggle={this.toggle}>Evaluation critère d'efficacité</ModalHeader>
                        <ModalBody>
                            <TabSwitcher>
                                <TabPanel whenActive={1}>
                                    <ReactTableRecapAnalyseAndTraite
                                        filterable={true}
                                        pivotBy={['libelleAt']}
                                        defaultFilterMethod={FilterCaseInsensitive}
                                        minRows={5}
                                        noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucun etat recupéré"}
                                        data={data_details}
                                        columns={data_column}
                                         
                                        previousText={"Précedent"}
                                        nextText={"Suivant"}
                                        rowsText={"Ligne(s)"}
                                        ofText={"sur "}
                                        loadingText="Chargement en cours..."
                                        loading={!(this.state.isLoaded)} />
                                    {/* <Loader></Loader>
                        <h1 style={{ textAlign: "center" }}>FICHE N° {this.state.numeroId} </h1>
                        <br/>
                        <h4 style={{ textAlign: "center" }}>Analyse N° {this.state.libelleAnalyse} </h4>
                        <MediaAsset_subContent libelle="Résultat traitement" content={this.state.resultatTraitement} />
                        <MediaAsset_subContent libelle="Critère efficacité" content={evalCritereItem} />
                        <MediaAsset_subContent libelle="Cause" content={this.state.cause} />
                        <MediaAsset_subContent libelle="Action corrective" content={this.state.actionCorrective}></MediaAsset_subContent>
                        <MediaAsset_subContent libelle="Correction" content={this.state.correction}></MediaAsset_subContent>
                        <hr/>
                        <br/>
                         */}
                         <FormGroup>
                            <FormGroup>
                                <FormGroup>
                                    <Label>Efficacité efficacité </Label>
                                    <Input type="select">
                                        <option value="" default > </option>
                                        <option value="éfficace" >Efficace</option>
                                        <option value="Inéfficace" >Inefficace</option>
                                    </Input>
                                    <Row>&nbsp;</Row>
                                    <Label>Preuve efficacité </Label>
                                    <Input type="textarea"></Input>
                                </FormGroup>
                            </FormGroup>
                        </FormGroup>
                                </TabPanel>
                            </TabSwitcher>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.handleSubmit} disabled={(this.state.valRoutage === true) || (this.state.dataStruc.length === 0)}>
                                {"Soumettre l'évaluation"}
                            </Button>
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
                        <ModalBody toggle={this.toggleNested} >{"response testert"}</ModalBody>
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
                                        this.get_criterebyid(rowInfo.original.id);
                                        this.setState({
                                            selected: rowInfo.index,
                                            idProcessus: rowInfo.original.idProcessus,
                                            numeroId: rowInfo.original.numeroId,
                                            idFnc: rowInfo.original.idFnc,
                                            descriptionFnc: rowInfo.original.descriptionFnc,
                                            famille: rowInfo.original.idFamille,
                                            idSource: rowInfo.original.idSource,
                                            idProcessusIsSet: true,
                                            qualification: rowInfo.original.qualification,
                                            qualificationIsSet: true,
                                            familleIsSet: true,
                                            idSourceIsSet: true,
                                            descriptionFncIsSet: true,
                                            libelleFamille: rowInfo.original.libelleFamille,
                                            libelleSource: rowInfo.original.libelleSource,
                                            libelleProcessus: rowInfo.original.libelleProcesus,
                                            resultatTraitement: rowInfo.original.resultatTraitement,
                                            cause: rowInfo.original.cause,
                                            actionCorrective: rowInfo.original.actionCorrective,
                                            correction: rowInfo.original.correction,
                                            libelleAnalyse: rowInfo.original.libelleAt
                                        });
                                        console.log(rowInfo.original);
                                    },
                                    style: {
                                        background: rowInfo.index === this.state.selected ? '#cd511f' : 'white',
                                        color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                    }
                                }
                            } else {
                                return {}
                            }
                        }}
                        previousText={"Précedent"}
                        nextText={"Suivant"}
                        rowsText={"Ligne(s)"}
                        ofText={"sur "}
                        loadingText="Chargement en cours..."
                        loading={!(this.state.isLoaded)} />
                </div>
            </React.Fragment>)
    }
}