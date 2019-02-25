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





class Deploy extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
       
    }

    componentWillReceiveProps(nextProps) {
        
    }

   
    render() {

    	return (<div>
                <div className = "row"> 
                    <div className="card col-md-12">
                    <div className="card-header">
                        <h4 className="card-title">Deploy Contracts</h4>
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
                            <label for="inputAddress">Token Symbol </label>
                            <input type="text" class="form-control" id="toAccountName" placeholder="Enter Token Symbol"></input>
                          </div>
                          <div class="form-group ">
                            <label for="inputAddress2">Start ICO Date</label>
                            <input type="date" class="form-control" id="inputAddress2" placeholder="mm/dd/yy"></input>
                          </div>
                          <div class="form-group">
                            <label for="inputAddress2">End ICO Date</label>
                            <input type="date" class="form-control" id="inputAddress2" placeholder="mm/dd/yy"></input>
                          </div>
                          <div class="form-row">
                            <div class="form-group col-md-12">
                            <label for="inputAddress2">Byte Code</label>
                             <textarea rows="4" cols="50" style={{width:'-webkit-fill-available', border: "1px solid lightgray"}}>
                              </textarea>
                            </div>

                           <div class="form-group col-md-12">
                            <label for="inputAddress2">ABI Definitions</label>
                             <textarea rows="4" cols="50" style={{width:'-webkit-fill-available', border: "1px solid lightgray"}}>
                              </textarea>
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputZip">Max Balance </label>
                              <input type="text" class="form-control" id="data" placeholder="Enter Max Balance"></input>
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputZip">Max Supply </label>
                              <input type="text" class="form-control" id="data" placeholder="Enter Max Supply"></input>
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputZip">Coin Name </label>
                              <input type="text" class="form-control" id="data" placeholder="Enter Coin Name"></input>
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputZip">Decimal Place </label>
                              <input type="text" class="form-control" id="data" placeholder="Enter Decimal Place"></input>
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputZip">Max Token to Supply </label>
                              <input type="text" class="form-control" id="data" placeholder="Decimal Places"></input>
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputZip">Target Amount </label>
                              <input type="text" class="form-control" id="data" placeholder="Target Amount"></input>
                            </div>
                          </div>
                          
                          <button type="submit" class="btn btn-primary">Send Transaction</button>
                          <button type="submit" style={{marginLeft: "30px"}}class="btn btn-primary">Call Method</button>
                        </form>
                        <div className="card col-md-6">
                             <div className="card-header">
                                <h4 className="card-title">Transaction Details  </h4>
                            </div>
                            <div className ="card-body"> 
                            <h5 style={{ color: "gray" , padding: "5px"}}>Deployed From  : </h5>
                            <h5 style={{ color: "gray" , padding: "5px"}}>TxHash : </h5>
                            <h5 style={{ color: "gray" , padding: "5px"}}>Contact Address : </h5>
                            <h5 style={{ color: "gray" , padding: "5px"}}>Deploy Status : </h5>
                            <h5 style={{ color: "gray" , padding: "5px"}}>Actual Tx Cost  : </h5>

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

export default connect(mapStateToProps, mapDispatchToProps)(Deploy)