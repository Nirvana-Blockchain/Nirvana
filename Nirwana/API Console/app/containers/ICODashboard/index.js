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
			<div>
				<div className = "row" style={{display : "inline-flex"}}> 
					<div className="card col-xs-3" style={{width: "20rem", background: "#F6931A"}}>
					  <div className="card-body">
					    <h4 className="card-title">Ethers</h4>
					    <h2 className="card-title">0 ETH</h2>
					    <p className="card-text">Total Ether Raised Till Date</p>
					  </div>
					</div>

					<div className="card col-xs-3" style={{marginLeft:"20px", width: "20rem", background: "#345281"}}>
					  <div className="card-body">
					    <h4 className="card-title">USD</h4>
					    <h2 className="card-title">0 USD</h2>
					    <p className="card-text">Total Evaluation in USD As of date</p>
					  </div>
					</div>
				</div>
				<div className = "row"> 
					<div className="card col-sm-5">
					  <div className="card-body">
					    <h4 className="card-title">ICO List</h4>
					    <table className="table">
							  <thead>
							    <tr>
							      <th scope="col">#</th>
							      <th scope="col">ICO Name</th>
							      <th scope="col">ICO List</th>
							      <th scope="col">Action</th>
							    </tr>
							  </thead>
							  <tbody>
							    <tr>
							      <th scope="row">1</th>
							      <td>Demo ICO NAme</td>
							      <td>Demo ICO List</td>
							      <td> <a className= "btn btn-success btn-xs" href ="javascript:void(0)"> Get Details </a></td>
							    </tr>
							    <tr>
							      <th scope="row">2</th>
							      <td>Demo ICO NAme</td>
							      <td>Demo ICO List</td>
							      <td> <a className= "btn btn-success btn-xs" href ="javascript:void(0)"> Get Details </a></td>
							    </tr>
							    <tr>
							      <th scope="row">3</th>
							      <td>Demo ICO NAme</td>
							      <td>Demo ICO List</td>
							      <td> <a className= "btn btn-success btn-xs" href ="javascript:void(0)"> Get Details </a></td>
							    </tr>
							    <tr>
							      <th scope="row">4</th>
							      <td>Demo ICO NAme</td>
							      <td>Demo ICO List</td>
							      <td> <a className= "btn btn-success btn-xs" href ="javascript:void(0)"> Get Details </a></td>
							    </tr>
							    <tr>
							      <th scope="row">5</th>
							      <td>Demo ICO NAme</td>
							      <td>Demo ICO List</td>
							      <td> <a className= "btn btn-success btn-xs" href ="javascript:void(0)"> Get Details </a></td>
							    </tr>
							  </tbody>
							</table>
					  </div>
					</div>

					<div className="card col-sm-7" >
					<div className="card-header">
						<h4 className="card-title">ICO Detials</h4>
					</div>
					  <div className="card-body">
					    <div className = "col-sm-12"> 
					  		<h3> Contract Name : Intelicoin </h3>
					  		<a id="contractaddress" href="https://rinkeby.etherscan.io/address/">0x8420cc223D004F436Bd892aabe248CF6E8Ff4839</a>
					  	</div>
					  	<div className="col-sm-12">
                <div className="col-sm-12" style={{padding: '0px', paddingTop: '10px'}}>
                    <h5 >Ether To Raise: 3971.12</h5>
                      <div className="progress">
  											<div className="progress-bar w-75" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
                </div>                                        
                <div className="col-sm-6 "style={{padding: '0px', paddingTop: '10px'}}>                                              
                    <h5 id="tokencount">Total Token as of now: 54000</h5>
                    <div className="progress">
                        <div id="totalToken" className="progress-bar w-26" role="progressbar" aria-valuenow="99.92592592592592" aria-valuemin="0" aria-valuemax="100" style={{width: "99.9259%"}}> 24000</div>
                    </div>
                </div>

                <div className="col-sm-6  margin-top-15" style={{padding: '0px', paddingTop: '10px'}}>                                              
                        <h5 id="targetAmount">Target Amount: $556000</h5>
                        <div className="progress">
                            <div id="tokenSold" className="progress-bar w-21" role="progressbar" aria-valuenow="699.59" aria-valuemin="0" aria-valuemax="100" style={{width: "0.125826%"}}>$699.59</div>
                        </div>
                    </div>
            </div> 
					  </div>
					</div>
				</div>
				<div className ="row"> 
				<div className="card col-sm-12">
					<div className="card-header">
						<h4 className="card-title">Recent Transtions</h4>
					</div>
					  <div className="card-body">
					    <table className="table">
							  <thead>
							    <tr>
							      <th scope="col">#</th>
							      <th scope="col">Transaction Hash</th>
							      <th scope="col">Transaction Type</th>
							    </tr>
							  </thead>
							  <tbody>
							    <tr>
							      <th scope="row">1</th>
							      <td>0xd5B39227B2B43dCd98c2C975DE37b5197b4e60d3</td>
							      <td>In Bound</td>
							    </tr>
							    <tr>
							      <th scope="row">2</th>
							      <td>0xd5B39227B2B43dCd98c2C975DE37b5197b4e60d3</td>
							      <td>In Bound</td>
							    </tr>
							    <tr>
							      <th scope="row">3</th>
							      <td>0xd5B39227B2B43dCd98c2C975DE37b5197b4e60d3</td>
							      <td>In Bound</td>
							    </tr>
							  </tbody>
							</table>
					  </div>
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