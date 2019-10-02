import React from "react";
import Processus from "./Processus";
import FamilleProcessus from "./FamilleProcessus";
import Source from "./Source";
import Loader from "./Loader"
import QualificationList from "./qualificationList";
import App from '../../setupProxy';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Form,
  Label,
  Col,
  FormText,
  Row

} from "reactstrap";

class ModalRensFNC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      descriptionFnc: '',
      descriptionFncIsSet: false,
      idProcessus: '',
      idProcessusIsSet: false,
      qualification:'',
      qualificationIsSet:false,
      idSource:'',
      idSourceIsSet:false,
      famille:'',
      familleIsSet:false,
      familleProcessus:FamilleProcessus,
      listeProcessus:Processus,
      isLoaded:false,
      responseSubmit: "",
      hasError: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.handleChangeProcessus=this.handleChangeProcessus.bind(this)
  }

  //PERMET DE FILTRER LES FAMILLES EN FONCTION DES PROCESSUS
  handleChangeProcessus = e => {
    e.preventDefault();
    var filtFam = FamilleProcessus.filter(item => {
      return item.idProcessus === e.target.value;
    });
    this.setState({ familleProcessus: filtFam, idProcessus: e.target.value });
    console.log(filtFam, this.state.idProcessus);
      this.setState({famille:filtFam[0].idFamille,familleIsSet :(filtFam[0].idFamille==="")?false:true})
  };
  handleSubmit = async e=>{
    
    const libelleFam=FamilleProcessus.find(item=>{return item.idFamille===this.state.famille}).libelleFamille;
    const libelleSource=Source.find(item=>{return item.idSource===this.state.idSource}).libelleSource;
    const libelleProcessus=Processus.find(item=>{return item.idProcessus===this.state.idProcessus}).libelleProcessus;
    e.preventDefault();
       await fetch('/create/fnc',
        {
          method: 'POST',
          headers:
          {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "data":
            {   //TODO RECUPERER LA VARIABLE DE SESSION DU STAFF
              "descriptionFNC": this.state.descriptionFnc,
              "idProcessus": this.state.idProcessus,
              "idsource": this.state.idSource,
              "idInitiateur": "maikol.ahoue@bridgebankgroup.com",
              "qualification": this.state.qualification,
              "idFamille": this.state.famille,

            },
            "dataLibelle": {
              "libelleFamille": libelleFam,
              "libelleProcessus": libelleProcessus,
              "libelleSource": libelleSource
            }
            }),
        }).then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              responseSubmit: result.data.message,
              nestedModal: true,
            });
          },
          (error) => {
            console.log("124", error.message);
            alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
            this.setState({
              isLoaded: true,
              responseSubmit:"Erreur lors de la communication avec le serveur : "+error.message,
              hasError: true
            });
          });         
      //const body = await response.text();
      // this.setState({ responseToPost: JSON.parse(body) });  
      console.log(this.state.responseToPost);
      
      this.toggle();

  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal
    });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.setState({
      descriptionFnc: '',
      descriptionFncIsSet: false,
      idProcessus: "",
      idProcessusIsSet: false,
      qualification:'',
      qualificationIsSet:false,
      idSource:'',
      idSourceIsSet:false,
      familleIsSet:false,
      famille:"",
      hasError: false,
      familleProcessus:FamilleProcessus,
      listeProcessus:Processus
    });
  }
  render() {
    var response=(this.state.isLoaded) ? this.state.responseSubmit : <React.Fragment><Loader></Loader><p style={{textAlign:'center'}}>Chargement en cours...</p></React.Fragment>
    var source =Source.map((item, i) => {
      return (
        <option key={i} value={item.idSource}>
          {item.libelleSource}
        </option>
      );
    });
    var famProc =
    this.state.familleProcessus.length > 0 &&
    this.state.familleProcessus.map((item, i) => {
      return (
        <option key={i} value={item.idFamille}>
          {item.libelleFamille}
        </option>
      );
    });

  const { listeProcessus } = this.state;
  let proceList =
    listeProcessus.length > 0 &&
    listeProcessus.map((item, i) => {
      return (
        <option key={i} value={item.idProcessus}>
          {item.libelleProcessus}
        </option>
      );
    }, this);

    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          size="lg"
          centered
          aria-labelledby="example-modal-sizes-title-lg"
          backdrop="static"
        >
          <ModalHeader toggle={this.toggle}>Formulaire de déclaration de la non conformité</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup >
                {/**QUALIFICATION */}
                <Label for="exampleEmail" md={12}>Qualification de la non conformité:</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.qualificationIsSet} //invalid={!this.state.qualificationIsSet}
                    type="select"
                    id="selectAgence"
                    name="selectbasic"
                    value={this.state.qualification}
                    onChange={e => {
                      this.setState({ qualification: e.target.value })
                      if (e.target.value !== null && e.target.value!=="" ) {
                        this.setState({ qualificationIsSet: true })
                      }
                      else { this.setState({ qualificationIsSet: false }) }
                    }}>
                    <option value="" defaultValue ></option>
                   {QualificationList}
                  </Input>
                  <FormText hidden={this.state.qualificationIsSet}>Selectionner la qualification</FormText>
                </Col>
                <Row>&nbsp;</Row>
                {/**PROCESSUS */}
                <Label for="exampleEmail" md={4}>Selectionner le processus :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.idProcessusIsSet} //invalid={!this.state.idProcessusIsSet}
                    type="select"
                    id="selectAgence"
                    name="selectbasic"
                    value={this.state.idProcessus}
                    onChange={e => {
                      this.setState({ idProcessus: e.target.value })
                      if (e.target.value !== null && e.target.value!=="" ) {
                        this.setState({ idProcessusIsSet: true })
                      }
                      else { this.setState({ idProcessusIsSet: false }) }
                      this.handleChangeProcessus(e)
                    }
                    }>
                    <option value="" defaultValue ></option>
                    {proceList}
                  </Input>
                  <FormText hidden={this.state.idProcessusIsSet}>Selectionner processus</FormText>
                </Col>
                {/**SOURCE */}
                <Row>&nbsp;</Row>
                <Label for="exampleEmail" md={4}>Selectionner la source :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.idSourceIsSet} ////invalid={this.state.idSourceIsSet}
                    type="select"
                    id="selectAgence"
                    name="selectbasic"
                    value={this.state.idSource}
                    onChange={e => {
                      this.setState({ idSource: e.target.value })
                      if (e.target.value !== null && e.target.value!=="" ) {
                        this.setState({ idSourceIsSet: true })
                      }
                      else { this.setState({ idSourceIsSet: false }) }
                    }
                    }>
                    <option value="" defaultValue ></option>
                    {source}
                  </Input>
                  <FormText hidden={this.state.idSourceIsSet}>Selectionner la source</FormText>
                </Col>
                {/*FAMILLE */}
                <Row>&nbsp;</Row>
                <Label for="selectFamille" md={4}>Selectionner la famille :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.familleIsSet} //invalid={!this.state.familleIsSet}
                    type="select"
                    id="selectFamille"
                    name="selectFamille"
                    value={this.state.famille}
                    onChange={e => {
                      this.setState({ famille: e.target.value })
                      if (e.target.value !== null && e.target.value!=="" ) {
                        this.setState({ familleIsSet: true })
                      }
                      else { this.setState({ familleIsSet: false }) }
                    }
                    }>{/**TODO FAMILLE */}
                    {/* <option value="" defaultValue ></option> */}
                   {famProc}
                  </Input>
                  <FormText hidden={this.state.familleIsSet}>Selectionner la famille</FormText>
                </Col>
                <Row>&nbsp;</Row>
                {/**DESCRIPTION DE LA NON CONFORMITE */}
                <Label for="exampleEmail" md={12}>Description de la non conformité entre 99 et 600 caractères ( {this.state.descriptionFnc.length}/600) :  </Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.descriptionFncIsSet} //invalid={!this.state.descriptionFncIsSet}
                    type="textarea"
                    id="selectAgence"
                    name="selectbasic"
                    maxLength="600"
                    minLength="100"
                    value={this.state.descriptionFnc}
                    onChange={e => {
                      this.setState({ descriptionFnc: e.target.value })

                      if (e.target.value !== null &&  e.target.value !== '' && e.target.value.trim() !== "" &&  e.target.value.length>=100) {
                        this.setState({ descriptionFncIsSet: true })
                      }
                      else { this.setState({ descriptionFncIsSet: false }) }}}>
                  </Input>
                  <FormText hidden={this.state.descriptionFncIsSet}>Décrire la non conformité (100 caratères minimun) </FormText>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleSubmit} disabled={
              !(this.state.descriptionFncIsSet && this.state.familleIsSet && this.state.idProcessusIsSet && this.state.idSourceIsSet && this.state.qualificationIsSet)
            }
            >
              Soumettre
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Annuler
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.nestedModal}
          toggle={this.toggleNested}
          onClosed={this.state.closeAll ? this.toggle : undefined}
          centered
          size="sm"
          backdrop="static"
        >
          <ModalHeader toggle={this.toggleNested} >{response}</ModalHeader>
        </Modal>
      </div>
    );
  }
}

export default ModalRensFNC;