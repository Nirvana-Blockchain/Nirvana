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





class SendAndRecieve extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
       
    }

    componentWillReceiveProps(nextProps) {
        
    }

   
    render() {

    	return (
    		<div>
                <div className = "row"> 
                    <div className="card col-md-12">
                    <div className="card-header">
                        <h4 className="card-title">Transactions</h4>
                    </div>
                      <div className="card-body" style={{display: "inherit"}}>
                        <form className="col-md-6">
                          <div class="form-row">
                            <div class="form-group col-md-12">
                              <label for="inputEmail4">Select From Account</label>
                              <select id="inputState" class="form-control">
                                <option selected>Choose...</option>
                                <option>...</option>
                              </select>
                            </div>
                            <div class="form-group col-md-12">
                              <label for="inputPassword4">Account Address</label>
                              <input type="text" class="form-control" id="inputPassword4" placeholder="Account Address"></input>
                            </div>
                          </div>
                          <div class="form-group">
                            <label for="inputAddress">To Account </label>
                            <input type="text" class="form-control" id="toAccountName" placeholder="To Account Name"></input>
                          </div>
                          <div class="form-group">
                            <label for="inputAddress2">Value (Ether)</label>
                            <input type="text" class="form-control" id="inputAddress2" placeholder="Enter Value to be transferred"></input>
                          </div>
                          <div class="form-row">
                            <div class="form-group col-md-12">
                              <label for="inputCity">Gas</label>
                              <input type="text" class="form-control" id="gas" placeholder="default"></input>
                            </div>
                            <div class="form-group col-md-12">
                              <label for="inputState">Gas Price </label>
                                <input type="text" class="form-control" id="gasPrice" placeholder="default"></input>

                            </div>
                            <div class="form-group col-md-12">
                              <label for="inputZip">Data</label>
                              <input type="text" class="form-control" id="data" placeholder="default"></input>
                            </div>
                            <div class="form-group col-md-12">
                              <label for="inputZip">Nonce</label>
                              <input type="text" class="form-control" id="Nonce" placeholder="default"></input>
                            </div>
                          </div>
                          <button type="submit" class="btn btn-primary">Send Transaction</button>
                        </form>
                        <div className="card col-md-6">
                             <div className="card-header">
                                <h4 className="card-title">Transaction Details  </h4>
                            </div>
                            <div className ="card-body"> 
                            <h5 style={{ color: "gray" , padding: "5px"}}>From Account : </h5>
                            <h5 style={{ color: "gray" , padding: "5px"}}>To Account : </h5>
                            <h5 style={{ color: "gray" , padding: "5px"}}>TxHash : </h5>
                            <h5 style={{ color: "gray" , padding: "5px"}}>More Details : </h5>
                            </div>
                        </div>
                      </div>
                    </div>
                      </div>
                    </div>)
        
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

export default connect(mapStateToProps, mapDispatchToProps)(SendAndRecieve)