import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import React, { Component } from "react";

class NonimateValidator extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            socialUrl: "",
        }
    }

    updateInterface(reponse){
        
    }

    onSubmit = () => {
        this.props.contract.nominateValidator(this.props.account, this.state.name, this.state.socialUrl, this.updateInterface);
    }

    render() {
        return (
            <Row>
                <Form>
                    <Col>
                        <FormGroup>
                            <Label for="exampleEmail">Name</Label>
                            <Input name="name" id="name" placeholder="with a placeholder" onChange={(e) => {
                                this.setState({ name: e.currentTarget.value })
                            }}

                            />
                        </FormGroup>

                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="exampleAddress">Social Profile</Label>
                            <Input
                                type="text"
                                name="url"
                                placeholder="http://facebook.com/profile=12345"
                                onChange={(e) => {
                                    this.setState({ socialUrl: e.currentTarget.value })
                                }}

                            />
                        </FormGroup>
                    </Col>
                    <Col><Button onClick={this.onSubmit}>Submit</Button></Col>
                </Form>
            </Row>
        );
    }
}

export default NonimateValidator;