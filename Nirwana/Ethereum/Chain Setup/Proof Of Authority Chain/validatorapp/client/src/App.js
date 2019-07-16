import React, { Component } from "react";
import SwipeableViews from "react-swipeable-views";
import getWeb3 from "./utils/getWeb3";
import Validators from './services/Validator'
import {
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import ValidatorList from "./components/ValidatorList";
import NonimateValidator from "./components/NominateValidator"
import { resolve } from "url";

var web3;


class App extends Component {

  state = { storageValue: 0, web3: null, accounts: null, contract: null };


  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      selectedAccount: "No Account Selected",
      name: "",
      socialUrl: "",
      address: "",
      isValidator: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.validatorContract = null;
  }
  componentDidMount = async () => {
    try {

      // Get network provider and web3 instance.
      web3 = await getWeb3();
      this.validatorContract = new Validators(web3);
      var accounts = await web3.eth.getAccounts();


      this.validatorContract.setAddress(accounts[0]);
      this.setState({ web3, selectedAccount: accounts[0] }, this.afterPropertySet);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  };

  updateIsValidator = (response) => {
    this.setState({ isValidator: response })
  }

  updateInterface() {
    this.validatorContract.isAddressAnValidator(this.state.selectedAccount).then((response) => {
      this.updateIsValidator(response);
    })

  }

  afterPropertySet = () => {
    this.updateInterface();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const pStyle = {
      height: this.state.height,
      width: this.state.width
    };
    if (!this.state.web3) {
      return <div>Not able to create web3 object</div>;
    }
    return (
      <div style={pStyle}>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Current Address: {this.state.selectedAccount}</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Option 1</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <div style={{ flexDirection: "column" }} height={this.state.height}>
          <Row>
            <Col>
              <div
                style={{
                  width: "100%",
                  height: "100%"
                }}
              >
                {this.getUI()}
              </div>
            </Col>
            <Col sm="1" />
          </Row>
        </div>
      </div>
    );
  }
  checkIfValidValidator() {
    return this.state.isValidator;
  }
  getUI() {


    if (this.checkIfValidValidator()) {
      return this.getInterfaceForValidator();
    } else {
      return this.getIntefaceForRegisterValidator();
    }
  }

  getInterfaceForValidator() {
    var validators = this.validatorContract.getValidators();
    var pendingValidators = this.validatorContract.getPendingValidators();
    return (
      <div >
        <Row className="mt-4">
          <Col>
            <h2>Validators</h2>
            <ValidatorList validators={validators} contract={this.validatorContract} currentAddress={this.state.selectedAccount} type="current"></ValidatorList>
          </Col>
          <Col>
            <h2>Pending Validators</h2>
            <ValidatorList validators={pendingValidators} type="pending" currentAddress={this.state.selectedAccount}></ValidatorList>
          </Col>
        </Row>
        {/* <Row>
          {this.getIntefaceForRegisterValidator()}
        </Row> */}
      </div>
    );
  }

  getIntefaceForRegisterValidator() {
    var validators = this.validatorContract.getValidators();
    var pendingValidators = this.validatorContract.getPendingValidators();
    return (
      <div >
        <Row className="mt-4">
          <Col>
            <h2>Validators</h2>
            <ValidatorList validators={validators} contract={this.validatorContract} currentAddress={this.state.selectedAccount} type="current"></ValidatorList>
          </Col>
          <Col>
            <h2>Pending Validators</h2>
            <ValidatorList validators={pendingValidators} contract={this.validatorContract} type="pending" currentAddress={this.state.selectedAccount}></ValidatorList>
          </Col>
        </Row>
        <Row>
          {this.registerForm()}
        </Row>
      </div>
    );
  }

  registerForm() {
    return (
      <div className="mt-3 ml-5">
        <NonimateValidator account={this.state.selectedAccount} contract={this.validatorContract}></NonimateValidator>
      </div>
    );
  }

  handleNameChange = (event) => {
    event.preventDefault()
    this.setState({ emailId: event.target.value });
  }

  handleUrlChange = (event) => {
    event.preventDefault()
    this.setState({ socialUrl: event.target.value });
  }



  onSubmit = (event) => {
    event.preventDefault()

    console.log(this.state.emailId, this.state.socialUrl);
    this.validatorContract.nominateValidator(this.state.selectedAccount, this.state.emailId, this.state.socialUrl, this.updateInterface);
  }
}

export default App;
