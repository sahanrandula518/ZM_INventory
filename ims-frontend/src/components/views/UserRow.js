/*
    SAHAN

 */

import React from "react";
import axio from "axios";
import UserUpdateForm from '../forms/UserUpdateForm';
import reduxDialog from 'redux-reactstrap-modal';
//import { confirmAlert } from 'react-confirm-alert'; // Import
//import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class UserRow extends React.Component{

    constructor(props){
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.state={
            activeStatus: false,
            userData:''
        }
    }

    componentWillMount() {
        axio.get('http://localhost:5000/api/users')
            .then(res => {
                this.setState({
                    users: res.data
                })
                console.log(res.data)
            })
            .catch(res => {
                console.log(res.error)
            });
    }


    deleteUser(){

      var userPreference;

        axio.delete('http://localhost:5000/api/users/' + this.props.obj.id)
            .then(response => {
              
                 window.confirm("Do you really want to delete?");
            })
            .catch(error => {
                console.log(error.response)
                
            });
    }

   

    render() {
        return(
            <tr className="positive">
                <td>{this.props.obj.id}</td> 
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.department}</td>
                
                
                { <td>
                    {/* <i className="icon checkmark"></i> */}
                    <div class="custom-control custom-switch">
                        {/* <label>Inactive</label> */}
                        <input type="checkbox" checked={this.state.activeStatus} ref="status" class="custom-control-input" id="activeStatus" />
                        <label class="custom-control-label" for="activeStatus">Active</label>
                    </div>
                    {/* <input type="checkbox"></input> */}
                    {/* <span className="badge badge-success">Active</span> */}
                    {/* <span className="badge badge-success">Inactive</span> */}
                
                </td>}
                <td>
                      <span>
                        <button type="button" onClick={this.deleteUser} className="btn btn-outline-danger btn-sm"><i className="trash icon"></i></button>
                        <button type="button" className="btn btn-outline-primary btn-sm" style={{ marginLeft: 5 }} data-toggle="modal"
                            data-target="#exampleModalUpdateCenter" onClick = {() => this.setState({userData :this.props.obj })}><i className="pencil alternate icon"></i>
                        </button>
                        <div className="modal fade"
                             id="exampleModalUpdateCenter"
                             tabindex="-1"
                             role="dialog"
                             aria-labelledby="exampleModalCenterTitle"
                             aria-hidden="true"
                          >
                         <div className="modal-dialog modal-dialog-centered" role="document">
                               <div className="modal-content">
                                     <div className="modal-header">
                                         <h5 className="modal-title" id="exampleModalLongTitle">
                                               Update a user - {this.props.obj.status}
                                         </h5>
                          <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                              >
                             <span aria-hidden="true">&times;</span>
                          </button>
                             </div>
                     <div className="modal-body">
                                <UserUpdateForm  modelClosed= {this.modelClosed} userData = {this.state.userData }/>
                     </div>
    {/*
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-danger"
        data-dismiss="modal"
      >
        Close
      </button>
     
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </div>
    */ }
    
                          </div>
                             </div>
                                 </div>
                      </span>
                </td>
            </tr>
        )
    }
}
export default UserRow;




//onClick={()=>this.props.oprnDialod('abs',{data:this.props.obj})}