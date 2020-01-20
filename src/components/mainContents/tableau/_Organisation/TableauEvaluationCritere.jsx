import React from 'react';


import "bootstrap/dist/css/bootstrap.min.css";
import ReactTableEvaluationFnc from 'react-table';
import "react-table/react-table.css";
import Loader from "../../../assets/Loader";
import TabSwitcher, {TabPanel } from "./TabSwitcher/TabSwitcher";
import { evaluationColumn} from '../../../assets/evaluationColumn';
import FilterCaseInsensitive from '../../../assets/filterInsensitive';
import TransFormLibstat from '../../../assets/transFormLibelleStatut';
import dateFormat from '../../../assets/dateFormatTransform';
import Source from '../../../assets/Source';
import Processus from '../../../assets/Processus';
import Famille from '../../../assets/FamilleProcessus';
import Auth from '../../../assets/Auth';
import ConfigUrl from '../../../assets/ConfigUrl'
import CritereItemEval from "./critereItemEval";


import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label,
    Row,
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

                evaluationEff:"",
                niveauSatisfaction:"",
                preuve:"",

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
                critereIsSet: false,

                selectedAnaCreIndex: null,
                selectedAnaCre: null,
                collapse: false,
                collapseDetail: false,
                fileArray:[],
                criterObject: [],
                critere: "",
                echeanceCritere: "",
                echeanceCritereIsSet: false,
                id: null,
                unAutorize: false,
                resultatTraitement: "",
                libelleAnalyse: "",
            
                responseToEval:"",
                idInitiateur:""
        }
        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggle = this.toggle.bind(this);
        this.newAnalyse = this.newAnalyse.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleCollapseDetail = this.toggleCollapseDetail.bind(this);
        this.getResultat_traitement = this.getResultat_traitement.bind(this);
        this.handleEvaluation = this.handleEvaluation.bind(this);
        this.get_critere_traitement_byIdfnc = this.get_critere_traitement_byIdfnc.bind(this);
        this.handleSubmit_evaluation=this.handleSubmit_evaluation.bind(this);
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

    get_critere_traitement_byIdfnc = async e => {
        this.setState({ isLoaded: false })
        await fetch(ConfigUrl.basePath+'/criter_EvalTraitementByidFnc/fnc',
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "data": {
                        "idFnc": e
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

    handleSubmit_evaluation = async e => {
        var tabActeur=[];
        var tabActeurDel=[];

        this.state.criterObject.map(el=>{

            tabActeur.push(el.acteursTraitant);
            tabActeurDel.push(el.acteursResponsableTraitement);

        })
        this.setState({ isLoaded: false })
        await fetch(ConfigUrl.basePath+'/clotureFnc_evaluation/fnc',
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "data": {
                        "acteurOrga": Auth.getUsername(),
                        "idFnc": this.state.idFnc,
                        "satisfaction":this.state.niveauSatisfaction,
                        "numeroId":this.state.numeroId,
                        "idActeurTraitant":tabActeur,
                        "idActeurDelegataire":tabActeurDel,
                        "idInitiateur":this.state.idInitiateur,
                        "preuve":this.state.preuve,
                        "statutEva":this.state.evaluationEff
                    }
                })
            }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        responseToEval: result.data.message
                    });
                    this.getResultat_traitement();
                    this.toggle();
                    this.toggleNested();
                },
                (error) => {
                    console.log("124", error.message);
                    alert("Erreur : "+error+" contacter les administrateurs si le problème persiste");
                    this.setState({
                        isLoaded: true,
                        errorMessage: error.message,
                        hasError: true,
                        responseToEval:error.message
                    });
                    this.toggleNested();

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
        await fetch(ConfigUrl.basePath+"/get_fnc_traiter/fnc")
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
                            }).libelleSource;
                            el.echeanceFnc = dateFormat(el.echeanceFnc);
                            el.libelleProcessus=Processus.find(elmt=>{return el.idProcessus===elmt.idProcessus}).libelleProcessus;
                            el.libelleFamille=Famille.find(elmt=> { return el.idFamille===elmt.idFamille } ).libelleFamille;
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
                key={item.id}
                item={item}
                dataAna={item.dataAna}
                numeroId={this.state.numeroId}
            />
        ))

//   const dataAff=this.state.criterObject.map((item,index)=>{

// return     <MediaAsset_subContent libelle="Résultat traitement" content={item.dataAna[0].resultatTraitement} />

//   })
var response=(this.state.isLoaded) ? this.state.responseToEval : <React.Fragment><Loader></Loader><p style={{textAlign:'center'}}>Chargement en cours...</p></React.Fragment>
            //affiche les options de l'evaluation de l'efficacite  
            //en fonction de l'efficacité ( efficace ou inefficace)
             var optionEvaluation = this.state.evaluationEff === "" || this.state.evaluationEff === undefined || this.state.evaluationEff === null 
            ? 
            <React.Fragment> 
            <option value="Satisfait" >Satisfait</option>
            <option value="Peu satisfait" >Peu satisfait</option>
            <option value="Moyennement satisfait" >Moyennement satisfait</option>
            <option value="Insatisfait" >Insatisfait</option>
            </React.Fragment> 
            :
            this.state.evaluationEff === "Efficace" 
            ? 
            <React.Fragment><option value="Satisfait" >Satisfait</option>
            <option value="Peu satisfait" >Peu satisfait</option>
            <option value="Moyennement satisfait" >Moyennement satisfait</option></React.Fragment> 
            : 
            <React.Fragment>
            <option value="Insatisfait" >Insatisfait</option>
            <option value="Peu satisfait" >Peu satisfait</option>
                </React.Fragment>
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
                                <h1 style={{ textAlign: "center" }}>FICHE N° {this.state.numeroId} </h1>
                                {/* <Details data={this.state.criterObject} ></Details> */}
                                {evalCritereItem}
                         <FormGroup>
                            <FormGroup>
                                <FormGroup>
                                    <Label>Evaluation de l'efficacité </Label>
                                    <Input type="select" onChange={e=>{
                                        this.setState({evaluationEff:e.target.value})
                                    }}>
                                        <option value="" default > </option>
                                        <option value="Efficace" >Efficace</option>
                                        <option value="Inefficace" >Inefficace</option>
                                    </Input>                        
                                    <Row>&nbsp;</Row>
                                    <Label>Preuve</Label>
                                    <Input type="input" onChange={e=>{  this.setState({preuve:e.target.value}) }}>
                                       
                                    </Input>
                                    <Row>&nbsp;</Row>
                                    <Label>Pièce jointe</Label>
                                    <Row>&nbsp;</Row>

                                    <input type="file" accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document" name="file" multiple onChange={this.onChangeHandler} />

                                </FormGroup>
                            </FormGroup>
                        </FormGroup>
                                </TabPanel>
                            </TabSwitcher>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.handleSubmit_evaluation} disabled={
                                (this.state.preuve.trim()==="") || (this.state.evaluationEff === "")
                                
                                }>
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
                        <ModalBody toggle={this.toggleNested} >{response}</ModalBody>
                    </Modal>
                </div>
                <div style={{ cursor: 'pointer', width:"95%",height:"90%", overflowX:"hidden" }}>
                    <ReactTableEvaluationFnc
                        filterable={true}
                        defaultFilterMethod={FilterCaseInsensitive}
                        minRows={5}
                        noDataText={(this.state.hasError) ? "Erreur lors de la récupération des données,contactez les administrateurs !" : "Aucun etat recupéré"}
                        data={this.state.responseToPost}
                        columns={evaluationColumn}
                        getTrProps={(state, rowInfo) => {
                            if (rowInfo && rowInfo.row) {
                                return {
                                    onClick: (e) => {
                                        e.preventDefault();
                                        this.toggle();
                                        this.get_critere_traitement_byIdfnc(rowInfo.original.idFnc);
                                        this.setState({
                                            idInitiateur:rowInfo.original.idInitiateur,
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
                        className="-striped -highlight"
                        style={{
                            height: "1000px" 
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