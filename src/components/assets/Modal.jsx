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
      processus: '',
      descritpionProc: '',
      procIsSet: '',
      descIsSet: '',
      nestedModal: false,
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
              {
                "descriptionFNC": this.state.descritpionProc,
                "idProcessus":this.state.processus,
                "idInitiateur": "maikol.ahoue@bridgebankgroup.com"
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
                <Label for="exampleEmail" md={4}>Selectionner le processus :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.procIsSet} invalid={!this.state.procIsSet}
                    type="select"
                    id="selectAgence"
                    name="selectbasic"
                    value={this.state.processus}
                    onChange={e => {
                      this.setState({ processus: e.target.value })
                      if (e.target.value !== null && e.target.value!=="" ) {
                        this.setState({ procIsSet: true })
                      }
                      else { this.setState({ procIsSet: false }) }
                    }
                    }>
                    <option value="" defaultValue >Choisir un processus :</option>
                    <option value="R1-kader.diallo@bridgebankgroup.com">Gerer la relation client</option>
                    <option value="Processus 2">Processus 2</option>
                  </Input>
                  <FormText hidden={this.state.procIsSet}>Selectionner processus</FormText>
                </Col>
                <Row>&nbsp;</Row>
                <Label for="exampleEmail" md={12}>Description de la non conformité ( {this.state.descritpionProc.length}/500) :  </Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.descIsSet} invalid={!this.state.descIsSet}
                    type="textarea"
                    id="selectAgence"
                    name="selectbasic"
                    
                    value={this.state.descritpionProc}
                    onChange={e => {
                      this.setState({ descritpionProc: e.target.value })
                      if (e.target.value !== null &&  e.target.value !== '' && e.target.value.trim !== null &&  e.target.value.length>5) {
                        this.setState({ descIsSet: true })
                      }
                      else { this.setState({ descIsSet: false }) }
                    }
                    }
                  >
                  </Input>
                  <FormText hidden={this.state.descIsSet}>Décrire la non conformité (500 caratères minimun) </FormText>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleSubmit} disabled={(this.state.descIsSet || this.state.descritpionProc)}
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