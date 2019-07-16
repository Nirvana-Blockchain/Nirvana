
import React, { Component } from "react";
import {
    ListGroup,
    ListGroupItem,
    Button,
    Modal,
    ModalFooter,
    ModalHeader,
    ModalBody

} from "reactstrap";

const style = {
    marginTop: "10px"
}

class ValidatorList extends React.Component {

    constructor() {
        super();
        this.state = {
            validators: [],
            isValidator: false,
            modal: false,
            contract:null,
            candidate:{
                0:"Default",
                1:"www.google.com"
            }
        };
        this.voteCountMapping = {
        }
    }
    getVoteCountFor(_address) {
        if (_address in this.voteCountMapping) {
            return this.voteCountMapping[_address];
        }
        return 0;
    }
    componentDidMount() {
        this.props.validators.then(this.handleValidatorChange);
        this.setState({ contract: this.props.contract });
    }

    handleValidatorChange = async (response) => {
        var contract = this.props.contract;
        if (this.props.voteCount) {
            for (var i in response) {
                var count = await contract.getVoteCountFor(response[i]);
                this.voteCountMapping[response[i]] = count.toString();
            }
        }


        var _address = this.props.currentAddress;
        if (contract) {
            var isValidator = await contract.isAddressAnValidator(_address);
            this.setState({ validators: response, isValidator: isValidator,contract: contract });
            return;
        }
        this.setState({ validators: response,contract:contract });





    }
    voteForValidator = async (e) => {
        var voted = await this.state.contract.voteForValidator(e.target.value);
    }

    getButtonIfValidator(_valueAddress) {
        if (this.state.isValidator) {
            return <Button color="success"
                className="ml-3"
                onClick={this.voteForValidator}
                value={_valueAddress}>Accept</Button>
        }
        return <div></div>
    }

    toggle = async (e) => {

        var _address = e.target.value;
        var details = await this.props.contract.getValidatorDetails(_address);
        this.setState(prevState => ({
            modal: !prevState.modal,
            candidate:details
        }));
    }
    closeModal = ()=>{
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    createList() {

        var retValue = [];
        var currentElement = null;
        for (var i in this.state.validators) {
            if (this.props.type === "pending") {
                currentElement = <ListGroupItem
                    key={this.state.validators[i]}>{this.state.validators[i]}  | Vote Count: {this.getVoteCountFor(this.state.validators[i])} |
                    {this.getButtonIfValidator(this.state.validators[i])}
                </ListGroupItem>;
            } else if (this.props.type === "current") {
                currentElement = <ListGroupItem
                    key={this.state.validators[i]}>{this.state.validators[i]}
                    <Button color="dark" className="ml-3" onClick={this.toggle}
                    value={this.state.validators[i]}
                    >Details</Button>
                </ListGroupItem>;
            }
            else {
                currentElement = <ListGroupItem key={this.state.validators[i]}>{this.state.validators[i]} </ListGroupItem>;
            }
            retValue.push(currentElement);
        }
        if (this.props.type === "current") {
            return (
                <div>
                    {retValue}
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.closeModal} className={this.props.className}>
                            <ModalHeader toggle={this.closeModal}>Modal title</ModalHeader>
                            <ModalBody>
                                <p>Name: {this.state.candidate["0"]}</p>
                                <p>Url: {this.state.candidate["1"]}</p>
                            </ModalBody>
                            <ModalFooter>
                                {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                                <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>)
        }

        return retValue;
    }
    render() {
        return (<ListGroup>
            {this.createList()}
        </ListGroup>);
    }
}
export default ValidatorList;