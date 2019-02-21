/**
 * ConfigPage
 *
 * This is the page where we show Configurations
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Container, Row, FormGroup, Label, Button } from 'reactstrap'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { bindActionCreators } from 'redux'
import * as practiceActions from '../../actions/practice'
import _get from 'lodash/get'
import Utils from './utils'
import update from 'react-addons-update'
import { Helmet } from 'react-helmet'
import Validator from '../../utils/validations'




class ConfigPage extends Component {
    constructor(props) {
        super(props)
        this.configFields = Utils.getConfigFields()
        this.state = {
            isReadOnly: true,
            configFields: this.configFields
        }

    }

    componentWillMount() {
        this.psId = this.props.match.params.psId
        this.props.practiceActions.fetchPracticeConfigByPsId(this.psId)
    }

    componentWillReceiveProps(nextProps) {
        console.log('TCL: ConfigPage -> componentWillReceiveProps -> nextProps', nextProps);        
        if (nextProps.configData) {
            this.setConfigValue(nextProps.configData)
        }
    }

    setConfigValue(configData) {
        let data = this.state.configFields
        let newData = data
        Object.keys(data).map((configType) => {
            let childConfigs = _get(data, configType)
            childConfigs && Object.keys(childConfigs).map((configName) => {
                let fieldValue = _get(configData, `${configType}.${configName}.value`)
                newData = update(newData, { [configType]: { [configName]: { value: { $set: fieldValue } } } })
            })
        })

        this.setState({ configFields: newData })
    }

    onUpdateConfig() {
        this.form.validateAll()
        if (!Validator.hasError(this.form)){
            let data = {
                practiceSubscriptionId: this.psId,
                practiceConfigs: this.state.configFields
            }
            this.props.practiceActions.updatePracticeConfig(data)
            this.setState({ isReadOnly: true })
        }
    }

    handleInputChange(configType, configName, event) {
        const target = event.target
        let value = target.type === 'checkbox' ? target.checked : target.value        
        let data = this.state.configFields
        let newData = update(data, { [configType]: { [configName]: { value: { $set: value } } } })
        this.setState({ configFields: newData })
    }


    render() {
        let { pmsData } = this.props
        let { isReadOnly, configFields } = this.state
        let inputCounter = 0
        return (
            <div className="app flex-row">
                <Helmet>
                    <title>Practice Configuration</title>
                </Helmet>
                <Container>
                    <Row className="mt-3">
                        <Col>
                            <div className="bg-white p-4">
                                <Form ref={c => { this.form = c }}>
                                    <Row>
                                        <Col>
                                            {
                                                Object.keys(configFields).map((configType) => {
                                                    let childConfigs = _get(configFields, configType)
                                                    let formElements = childConfigs && Object.keys(childConfigs).map((configName) => {
                                                        inputCounter++
                                                        let isRequired = _get(childConfigs, `${configName}.mandatory`, false)
                                                        let validations = [];
                                                        if(isRequired){
                                                            validations.push(Validator.required);
                                                        }
                                                        return (
                                                            <FormGroup row className="mb-4" > 
                                                                <Col md="3">
                                                                    <Label htmlFor={`config-input-${inputCounter}`}>{configName}</Label>
                                                                </Col>
                                                                <Col xs="12" md="9">
                                                                    {isReadOnly ?
                                                                        (<p className="form-control-static">{_get(childConfigs, `${configName}.value`, '-')}</p>) :
                                                                        (<Input type="text" name={`config-input-${inputCounter}`} data-id={inputCounter} id={`configInput${inputCounter}`} rows="9"
                                                                            placeholder="" value={_get(childConfigs, `${configName}.value`)} onChange={this.handleInputChange.bind(this, configType, configName)}
                                                                            className="form-control" validations={validations} />)
                                                                    }
                                                                </Col>
                                                            </FormGroup>
                                                        )
                                                    })
                                                    return (
                                                        <div>
                                                            <div className='pt-2 pb-2'><h5><b>{configType}</b></h5></div>
                                                            {formElements}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="pull-right">
                                                {isReadOnly ?
                                                    (<Button id="editBtn" outline className="mx-2" color='primary' onClick={() => { this.setState({ isReadOnly: false }) }}>Edit</Button>) :
                                                    (<div>
                                                        <Button id="saveBtn" className="mx-2" color='primary' onClick={this.onUpdateConfig.bind(this)}>Save</Button>
                                                        <Button id="cancelBtn" className="mx-2" onClick={() => { this.setState({ isReadOnly: true }) }}>Cancel</Button>
                                                    </div>)
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        configData: state.practiceReducerHandler.configData,
        isSaveSuccess: state.practiceReducerHandler.isSaveSuccess,
        saveResponse: state.practiceReducerHandler.saveResponse
    }
}

function mapDispatchToProps(dispatch) {
    return {
        practiceActions: bindActionCreators(practiceActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage)