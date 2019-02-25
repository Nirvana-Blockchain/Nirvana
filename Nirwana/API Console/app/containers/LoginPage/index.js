/**
 * LoginPage
 *
 * This is the page we show when the user visits login url
 */

import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,  
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormGroup,
} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {
  AppFooter,
  AppHeader
} from '@coreui/react';
import { toast } from 'react-toastify';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router';
import DefaultFooter from '../../components/DefaultFooter';
import LoginHeader from '../../components/LoginHeader';
import { Helmet } from 'react-helmet'
import Validator from '../../utils/validations'

import * as loginActions from '../../actions/login'

class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    };
  }
  componentWillMount() {
    console.log('componentWillMount props loginResponse: ', this.props.loginResponse)
  }




  handleSubmit(event) {
    event.preventDefault();
    
    this.form.validateAll()
    if(!Validator.hasError(this.form)){
        this.props.actions.login({ email: this.state.email, password: this.state.password });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.props.history.push('/app')
    }
    if (nextProps.loginResponse && nextProps.loginResponse.success === false){
        toast.error(nextProps.loginResponse.message);
    }
  }


  handleChange(event) {

    const target = event.target

    const value = target.type === 'checkbox' ? target.checked : target.value

    const name = target.name

    this.setState({ [name]: value });

  }


  render() {
    let { loginResponse, isLoggedIn } = this.props;
    console.log('render props loginResponse: ', loginResponse, isLoggedIn)
    return (
      <div className="app">
        <Helmet>
            <title>Login</title>
        </Helmet>
        <AppHeader fixed>
          <LoginHeader />
        </AppHeader>
        <div className="app-body flex-row align-items-center">
          <Container>   
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <Form ref={c => { this.form = c }}>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input className="form-control" id="username" type="text" placeholder="Username" name='email'
                            value={this.state.email} onChange={this.handleChange.bind(this)} validations={[Validator.required, Validator.email]}/>

                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock" />
                            </InputGroupText>
                          </InputGroupAddon>

                          <Input className="form-control" id="password" type="password" placeholder="Password" name='password'
                            value={this.state.password} onChange={this.handleChange.bind(this)} validations={[Validator.required]}/>

                        </InputGroup>
                      </Form>
                      <Row>
                        <Col xs="6">                          
                          <Button id="loginBtn" color="primary" className="px-4" onClick={this.handleSubmit.bind(this)}>
                            Login
                        </Button>
                        </Col>
                        {/*<Col xs="6" className="text-right">
                          <Link to="/forgotPassword">
                            <Button id="forgotPasswordBtn" color="link" className="px-0">
                              Forgot password?
                        </Button>
                          </Link>
                        </Col>*/}
                      </Row>
                    </CardBody>
                  </Card>
                 {/* <Card
                    className="text-white bg-primary py-5 d-md-down-none"
                    style={{ width: `${44}%` }}
                  >
                    <CardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>
                          Dont have an account yet...Click here to create an account
                      </p>
                        <Link to="/signup">
                          <Button id="registerNowBtn" color="primary" className="mt-3" active>
                            Register Now!
                        </Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>*/}
                </CardGroup>
              </Col>
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
    loginResponse: state.loginReducerHandler.loginResponse,
    isLoggedIn: state.loginReducerHandler.isLoggedIn

  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)