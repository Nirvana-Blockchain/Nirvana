import React, { Component } from 'react';
import {
    Button, Card, CardBody, CardFooter, Col, Container,
    InputGroup, InputGroupAddon, InputGroupText, Row, Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, FormGroup, Label, Jumbotron
} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ReactPasswordStrength from 'react-password-strength';
import './style.css'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'
import {
    AppFooter,
    AppHeader
} from '@coreui/react';
import { Helmet } from 'react-helmet'
import Validator from '../../utils/validations'
import * as pmsActions from '../../actions/pms'
import * as loginActions from '../../actions/login';
import * as practice from '../../actions/practice';
import DefaultFooter from '../../components/DefaultFooter';
import LoginHeader from '../../components/LoginHeader';

class SignupPage extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            dropdownOpen: false,
            value: '',
            pmsId: '',
            email: '',
            isValidated: false,
            isPasswordValid: false,
            showAlert: false
        };
    }

    handleSubmit(e) {
        
        e.preventDefault();
        if(!this.state.isPasswordValid) {
            this.setState({
                showAlert:true
            })
            return
        }
        this.form.validateAll()
        this.setState({ isValidated: true })
        console.log(this.form)
        if(this.state.password != this.state.confirmPassword)
        {
            return;
        }
        if (!Validator.hasError(this.form) && this.state.value.length > 0) {
            var data =
            {
                "email": this.state.email,
                "password": this.state.confirmPassword,
                "first_name": this.state.firstName,
                "last_name": this.state.lastName,
                "org_name": this.state.organisation,
                "org_website": this.state.website,
                "phone_number": this.state.contactNumber,
                "pms_id": this.state.pmsId
            };
            this.props.actions.register(data);
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillMount() {
        //this.props.practiceAction.fetchPracticeList();       
        this.props.practiceAction.fetchPMSList();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        console.log(this.props.registerUserResponse, "registerUserResponse");
    }

    toggle() {
        // console.log("data")
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeCallback = state => {
        console.log(state)
        this.setState({ passLength: state.password.length, password:state.password, isPasswordValid: state.isValid
         })
    }

    changeValue(prac_id, prac_name) {
        //console.log(e.currentTarget)
        this.setState({ value: prac_name, pmsId: prac_id })
    }

    render() {
        console.log(this.props.registerUserResponse, "Data");

        const { practiceListResponse, isUserRegistered, registerUserResponse } = this.props;
        console.log(this.props, "Props")
        const practiceListData = practiceListResponse ? practiceListResponse : [];
        const inputProps = {
            placeholder: "Password",
            autoFocus: true,
            className: 'another-input-prop-class-name',
        };
        return (
            <div className="app">
                <Helmet>
                    <title>Sign Up</title>
                </Helmet>
                <AppHeader fixed>
                    <LoginHeader />
                </AppHeader>
                <div className="app-body flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            {isUserRegistered ?
                                (<div>
                                    <Jumbotron>
                                        <h1 className="display-3">Congratulations!</h1>
                                        <p className="lead">{_get(registerUserResponse, 'message', '')}</p>
                                        <hr className="my-2" />
                                        <p className="lead">
                                            <a className="btn btn-primary" id="loginBtn" href="/login">Login</a>
                                        </p>
                                    </Jumbotron>
                                </div>)
                                :
                                (<Col md="12">
                                    <Card className="mx-4">
                                        <CardBody className="p-4">
                                            <h1>Register</h1>
                                            <p className="text-muted">Create your account</p>
                                            <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
                                                <Row>
                                                    <Col md="5">
                                                        <InputGroup className="mb-4">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                     
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input className="form-control" type="text" onChange={(e) => this.handleChange(e)} name="firstName" placeholder="First Name" id="firstName" validations={[Validator.required]} />
                                                        </InputGroup>
                                                    </Col>
                                                    <Col md="5">
                                                        <InputGroup className="mb-4">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                     
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input className="form-control" type="text" onChange={(e) => this.handleChange(e)} name="lastName" placeholder="Last Name" id="lastName" validations={[Validator.required]} />
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="5">
                                                        <InputGroup className="mb-4">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                     
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input className="form-control" type="text" onChange={(e) => this.handleChange(e)} name="contactNumber" placeholder="Phone Number" id="phoneNumber" validations={[Validator.required, Validator.mobile]} />
                                                        </InputGroup>
                                                    </Col>
                                                    <Col md="5">
                                                        <InputGroup className="mb-4">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                     
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input className="form-control" type="email" onChange={(e) => this.handleChange(e)} name="email" placeholder="Email" id="email" validations={[Validator.required, Validator.email]} />
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="5">
                                                        <InputGroup className="mb-4">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                <i className="icon-lock"></i>
                                                                </InputGroupText>
                                                                <ReactPasswordStrength
                                                                    ref={ref => this.ReactPasswordStrength = ref}
                                                                    minLength={6}
                                                                    inputProps={{ ...inputProps, id: 'inputPassword1',className: "form-control" }}
                                                                    changeCallback={this.changeCallback}
                                                                    onChange={(e) => this.handleChange(e)} 
                                                                    name="password"
                                                                />
                                                                
                                                            </InputGroupAddon>
                                                            
                                                        </InputGroup>
                                                        
                                                        <div>
                                                        {(this.state.password != this.state.confirmPassword) ? <span style={{'marginTop':"-25px"}}className="validation-help-block">Password and Confirm Password does not match</span> : null}
                                                        {(this.state.showAlert && !this.state.isPasswordValid && this.state.password == this.state.confirmPassword) ? <span style={{'marginTop':"-25px"}}className="validation-help-block">Please Enter a valid password</span> : null}
                                                        </div>
                                                    </Col>
                                                    <Col md="5">
                                                        <InputGroup className="mb-4">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                <i className="icon-lock"></i>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input className="form-control"  type="password" onChange={(e) => this.handleChange(e)} name="confirmPassword" placeholder="Confirm Password" id="password" validations={[Validator.required]} />
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                                {/*
                        <Row>
                          <Col className="captcha-format" md="3">
                            <div className="g-recaptcha" data-sitekey="6LfwyWQUAAAAAGCNFxzVzTanp7wIPM8sfFgor59B"></div>
                          </Col>
                        </Row>
                        */}
                                                <Row>
                                                    <Col md="3">
                                                        <Button id="createAccount" color="success" block>Create Account</Button>
                                                        <p>Already have an account ? <Link id="signIn" to="/login">SignIn</Link></p>

                                                         {!this.props.isUserRegistered && <p style={{color: 'red' , paddingTop:'10px'}}>{this.props.registerUserResponse && this.props.registerUserResponse.message ? this.props.registerUserResponse.message:""}</p>}
                                                    </Col>
                                                </Row>
                                            </Form>

                                        </CardBody>
                                    </Card>
                                </Col>)
                            }
                        </Row>
                    </Container>
                </div>
                <AppFooter>
                    <DefaultFooter />
                </AppFooter>
            </div>
        );
    }
}


function mapStateToProps(state) {
    console.log('login new mapStateToProps', state);
    return {
        signupResponse: state.loginReducerHandler.loginResponse,
        practiceListResponse: state.pmsReducerHandler.pmsList,
        registerUserResponse: state.loginReducerHandler.registerUserResponse,
        isUserRegistered: state.loginReducerHandler.isUserRegistered,
        updateStatus: state.loginReducerHandler.updateStatus,
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch),
        practiceAction: bindActionCreators(pmsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)