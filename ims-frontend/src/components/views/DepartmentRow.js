/*
    SAHAN

 */

import React from "react";
import axio from "axios";
import DepartmentUpdateForm from '../forms/DepartmentUpdateForm';

class DepartmentRow extends React.Component{

    constructor(props){
        super(props);
        this.deleteDepartment = this.deleteDepartment.bind(this);
        this.state={
            activeStatus: false,
        }
    }

    componentWillMount() {
        axio.get('http://localhost:5000/api/department')
            .then(res => {
                this.setState({
                    Departments: res.data
                })
              //  console.log(res.data)
            })
            .catch(res => {
                console.log(res.error)
            });
    }

    deleteDepartment(){
        axio.delete('http://localhost:5000/api/department/' + this.props.obj.id)
            .then(response => {
                console.log("department Deleted" + response.data);
                /*
                export default class DepartmentRow extends React.Component {
                  button() {
                    Alert.alert(
                      'Alert Title',
                      'Alert message here...',
                      [
                        {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                        {text: 'YES', onPress: () => console.warn('YES Pressed')},
                      ]
                    );
                  }
                  */
            })
            .catch(error => {
                console.log(error.response)
            });
    }
/*
    onDelete = id => {
        confirmAlert({
          title: 'Confirm to delete',
          message: 'Are you sure to do this ?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                this.props.deleteDepartment(id);
              }
            },
            {
              label: 'No',
              onClick: () => {}
            }
          ]
        });
      };
      */

    render() {
        return(
            <tr className="positive">
                <td>{this.props.obj.id}</td>
                <td>{this.props.obj.department}</td>
                
                <td>
                    {/*
                    <span>
                <button
                    type='button'
                    className='btn btn-outline-danger btn-sm'
                    onClick={() => {
                      this.onDelete( this.props.obj.id);
                    }}
                  >
                    <i className='trash icon'></i>
                  </button>
                  </span>
    */}
                    {/*
                    <i className="icon checkmark"></i>
                    <span className="badge badge-success">Approved</span>
                    */}
                     <div class="custom-control custom-switch">
                        {/* <label>Inactive</label> */}
                        <input type="checkbox" checked={this.state.activeStatus} ref="status" class="custom-control-input" id="activeStatus" />
                        <label class="custom-control-label" for="activeStatus">Active</label>
                    </div>

                </td>
                <td>
                      <span>
                        <button type="button" onClick={this.deleteDepartment} className="btn btn-outline-danger btn-sm"><i className="trash icon"></i></button>
                        <button type="button" className="btn btn-outline-primary btn-sm" style={{ marginLeft: 5 }}><i className="pencil alternate icon"></i></button> 
                        <div className="modal fade"
                          id="exampleModalUpdateCenter"
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalCenterTitle"
                          aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered" role="document">
                              <div className="modal-content">
                                <h5 className="modal-title" id="exampleModalLongTitle">
                                      Update a Department -{this.props.obj.status}
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <DepartmentUpdateForm modelClosed= {this.modelClosed}/>
                              </div>
                            </div>
                          </div>
                      {/*
                        <TouchableOpacity onPress={() => this.button()}>
                        <Text>Button</Text>
                         </TouchableOpacity>
    */}

    {/*
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
                      Update a department - {this.props.obj.status}
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
                <DepartmentUpdateForm  modelClosed= {this.modelClosed}/>
          </div>


          </div>
      </div>
    </div>

    */}
    
                      </span>
                </td>
            </tr>


        )
    }
}
export default DepartmentRow;
