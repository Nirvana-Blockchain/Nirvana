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





class Wallet extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
       
    }

    componentWillReceiveProps(nextProps) {
        
    }

   
    render() {

    	return (<div>
    		Wallet
        
            </div> )
        
    }
}


function mapStateToProps(state) {
    return {
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)