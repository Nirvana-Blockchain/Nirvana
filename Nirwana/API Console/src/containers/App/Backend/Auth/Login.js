import { Link } from 'react-router-dom';

import { compose } from 'redux';
import ListErrors from 'components/ListErrors';
import React from 'react';
import { connect } from 'react-redux';
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
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { onLoginSubmit, onLoginUnload } from './actions';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

const mapStateToProps = state => ({ ...state.auth });

class Login extends React.Component {
  componentWillUnmount() {
    this.props.onLoginUnload();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <ListErrors errors={this.props.errors} />
                <Card className="p-4">
                  <CardBody>
                    <form
                      onSubmit={handleSubmit(
                        this.props.onLoginSubmit.bind(this),
                      )}
                    >
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          name="title"
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Email"
                          component="input"
                          required
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          name="password"
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Password"
                          component="input"
                          required
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            type="submit"
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                        <Link to="/register">
                          <Button style = {{marginTop: "-3px !important"}}type= "button"color="link" className="mt-3" active>
                            Register Now!
                          </Button>
                        </Link>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const withConnect = connect(
  mapStateToProps,
  { onLoginSubmit, onLoginUnload },
);

const withReducer = injectReducer({ key: 'auth', reducer });

const withreduxForm = reduxForm({
  form: 'LoginForm',
});

export default compose(
  withReducer,
  withreduxForm,
  withConnect,
)(Login);
