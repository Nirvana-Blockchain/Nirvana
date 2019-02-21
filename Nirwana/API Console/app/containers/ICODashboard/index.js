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





class ICODashboard extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
       
    }

    componentWillReceiveProps(nextProps) {
        
    }

   
    render() {

			return (
			<div style={{display : "inline-flex"}}> 
				<div class="card col-xs-3" style={{width: "20rem", background: "#F6931A"}}>
				  <div class="card-body">
				    <h4 class="card-title">Ethers</h4>
				    <h2 class="card-title">0 ETH</h2>
				    <p class="card-text">Total Ether Raised Till Date</p>
				  </div>
				</div>
				<div class="card" style={{marginLeft:"20px", width: "20rem", background: "#345281"}}>
				  <div class="card-body">
				    <h4 class="card-title">USD</h4>
				    <h2 class="card-title">0 USD</h2>
				    <p class="card-text">Total Evaluation in USD As of date</p>
				  </div>
				</div>
			</div>
			)

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

export default connect(mapStateToProps, mapDispatchToProps)(ICODashboard)