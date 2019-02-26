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
        this.state ={
          name: "",
          phrase: "",
          valid: false
        }
    }

    componentWillMount() {
       
    }

    componentWillReceiveProps(nextProps) {
        
    }
    addAccount() {
      
    }
    change(e) {
      this.setState({
        [e.target.name] : e.target.value
      })
    }
    render() {

    	return (

       <div>
        <div className = "row"> 
          <div className="card col-sm-12">
           <div className="card-header">
            <h3> Accounts List </h3>
           </div>
            <div className="card-body">
            <form className="form-inline" style={{padding: "40px", border: "1px solid lightgrey"}}>

                  <label className="sr-only" for="inlineFormInputName2" >Account Name</label>
                  <input type="text" className="form-control mb-3 mr-sm-3 mb-sm-0" name="name" placeholder="Account Name" onChange={this.change.bind(this)} value={this.state.name}></input>
              
              
                  <label className="sr-only" for="inlineFormInputName2">Pass Phrase</label>
                  <input type="text" style={{"marginLeft": "40px"}} name="phrase" className="form-control mb-3 mr-sm-3 mb-sm-0" onChange={this.change.bind(this)} value={this.state.phrase} placeholder="Pass Phrase"></input>
             
                  <label className="sr-only" for="inlineFormInputName2">Password</label>
                  <input type="password" style={{"marginLeft": "40px"}} onChange={this.change.bind(this)} value={this.state.password} name="password" className="form-control mb-3 mr-sm-3 mb-sm-0" id="inlineFormInputName2" placeholder="Password"></input>
                  <a  style={{"marginLeft": "40px"}} onClick={this.addAccount.bind(this)}  className= "btn btn-success btn-xs"  href ="javascript:void(0)"> Add Account </a>
             </form>
              <table className="table" style={{marginTop: "30px"}}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Impetus_ICO</td>
                    <td>0x70C838d7e320e21641e596948a8F7DB11fe9E8B7</td>
                    <td>14.748249564 </td>
                    <td> <a className= "btn btn-success btn-xs" href ="javascript:void(0)"> Get Balance </a></td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Transility_ICO</td>
                    <td>0x70C838d7e320e21641e596948a8F7DB11fe9E8B7</td>
                    <td>1.996679334 </td>
                    <td> <a className= "btn btn-success btn-xs" href ="javascript:void(0)"> Get Balance </a></td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Impetus_ICO</td>
                    <td>0x70C838d7e320e21641e596948a8F7DB11fe9E8B7</td>
                    <td>0 </td>
                    <td> <a className= "btn btn-success btn-xs" href ="javascript:void(0)"> Get Balance </a></td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>ImpeutsAccount  </td>
                    <td>0x70C838d7e320e21641e596948a8F7DB11fe9E8B7</td>
                    <td>14.748249564 </td>
                    <td> <a className= "btn btn-success btn-xs" href ="javascript:void(0)"> Get Balance </a></td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Impetus_ICO</td>
                    <td>0x70C838d7e320e21641e596948a8F7DB11fe9E8B7</td>
                    <td>14.748249564 </td>
                    <td> <a className= "btn btn-success btn-xs" href ="javascript:void(0)"> Get Balance </a></td>
                  </tr>
                </tbody>
              </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)