import React from "react";
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
      familleIsSet:false
    };

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
  }

  handleSubmit = async e=>{
    e.preventDefault();
    console.log(this.state.descritpionProc);
    
      const response = await fetch('/declarationFNC',
        {
          method: 'POST',
          headers:
          {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "data":
              {   //TODO RECUPERER LA VARIABLE DE SESSION DU STAFF
                "descriptionFNC": this.state.descritpionProc,
                "idProcessus":this.state.processus,
                "idsource": this.state.idSource,
                "idInitiateur": "maikol.ahoue@bridgebankgroup.com",
                "qualification":this.state.qualification,
                "idFamille":this.state.idFamille
              }
            }),
        });
      const body = await response.text();
      this.setState({ responseToPost: JSON.parse(body) });  
      console.log(this.state.responseToPost);
      console.log(this.state.processus);
      this.setState({ processus: null });
      this.setState({ descritpionProc: "" });
      this.setState({ descIsSet: false });
      this.setState({ procIsSet: false });
      this.toggleNested();
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
  }

  render() {
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
        >
          <ModalHeader toggle={this.toggle}>Formulaire de déclaration de la non conformité</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup >
                {/**QUALIFICATION */}
                <Label for="exampleEmail" md={12}>Qualification de la non conformité:</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.qualificationIsSet} invalid={!this.state.qualificationIsSet}
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
                    <option value="1">Mineure</option>
                    <option value="2">Majeure</option>
                  </Input>
                  <FormText hidden={this.state.qualificationIsSet}>Selectionner la qualification</FormText>
                </Col>
                <Row>&nbsp;</Row>
                {/**PROCESSUS */}
                <Label for="exampleEmail" md={4}>Selectionner le processus :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.idProcessusIsSet} invalid={!this.state.idProcessusIsSet}
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
                    }
                    }>
                    <option value="" defaultValue ></option>
                    <option value="R1-kader.diallo@bridgebankgroup.com">Gerer la relation client</option>
                    <option value="Processus 2">Processus 2</option>
                  </Input>
                  <FormText hidden={this.state.idProcessusIsSet}>Selectionner processus</FormText>
                </Col>
                {/**SOURCE */}
                <Row>&nbsp;</Row>
                <Label for="exampleEmail" md={4}>Selectionner la source :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.idSourceIsSet} invalid={!this.state.idSourceIsSet}
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
                    <option value="R1-kader.diallo@bridgebankgroup.com">Gerer la relation client</option>
                    <option value="Processus 2">Processus 2</option>
                  </Input>
                  <FormText hidden={this.state.idSourceIsSet}>Selectionner la source</FormText>
                </Col>
                {/*FAMILLE */}
                <Row>&nbsp;</Row>
                <Label for="selectFamille" md={4}>Selectionner la famille :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.familleIsSet} invalid={!this.state.familleIsSet}
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
                    }>
                    <option value="" defaultValue ></option>
                    <option value="R1-kader.diallo@bridgebankgroup.com">Gerer la relation client</option>
                    <option value="Processus 2">Processus 2</option>
                  </Input>
                  <FormText hidden={this.state.familleIsSet}>Selectionner la famille</FormText>
                </Col>
                <Row>&nbsp;</Row>
                {/**DESCRIPTION DE LA NON CONFORMITE */}
                <Label for="exampleEmail" md={12}>Description de la non conformité entre 99 et 600 caractères ( {this.state.descriptionFnc.length}/600) :  </Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.descriptionFncIsSet} invalid={!this.state.descriptionFncIsSet}
                    type="textarea"
                    id="selectAgence"
                    name="selectbasic"
                    maxLength="600"
                    minLength="100"
                    value={this.state.descriptionFnc}
                    onChange={e => {
                      this.setState({ descriptionFnc: e.target.value })
                      if (e.target.value !== null &&  e.target.value !== '' && e.target.value.trim !== null &&  e.target.value.length>=100) {
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
        >
          <ModalHeader toggle={this.toggleNested} >Formulaire envoyé</ModalHeader>
        </Modal>
      </div>
    );
  }
}

export default ModalRensFNC;