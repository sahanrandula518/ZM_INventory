import { Field, reduxForm, submit } from "redux-form";
import React, { Component } from "react";
import { connect } from "react-redux";
import axio from 'axios';
import { Department } from "../views/Department";





export class UserUpdateForm extends Component {
  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div class="form-group">
      <label>{label}</label>

      <input {...input} type={type} class="form-control" />
      {touched && error && <span>{error}</span>}
    </div>
  );

  constructor(props) {
      super(props);

      this.state = {
          name: '',
          department_id: '',
          status:'',
          department:[],
          userData:''
      }

      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeDepartmentId = this.onChangeDepartmentId.bind(this);
      this.onChangeStatus = this.onChangeStatus.bind(this);
      this.submitFrom = this.submitFrom.bind(this);
  }

componentWillReceiveProps =(props)=>{
  const {userData} =  props;  
if(userData){
  console.log(userData);
  
this.setState({
  name : userData.name,
  Department:userData.department,
  status:userData.status

})
}
}

  componentDidMount =()=>{

    axio.get('http://localhost:5000/api/department')
    .then(res => {
      this.setState({
        department: res.data
      })
    console.log(res.data)
    })
    .catch(res => {
      console.log(res.error)
    });


   
  }

  onChangeName(e){
    e.preventDefault();
    const value = e.target.value
    this.setState({ name: value})
  }
  onChangeDepartmentId(e){
    e.preventDefault();
    const value = e.target.value
    this.setState({department_id: value})
  }
  
  onChangeStatus(e){
    e.preventDefault();
    const value = e.target.value
    this.setState({status: value})
  }
/*
    handleChange(e){
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        this.setState({[name]: value})
    }

    */

    submitFrom(e){
     //   e.preventDefault();

        const userObj = {
            name: this.state.name,
            department_id: this.state.department_id,
            status: this.state.status
        };

        axio.post('http://localhost:5000/api/users', userObj)
            .then(res => {
                console.log(res.data)
                this.props.modelClosed(true);
            })
            .catch(err => {
                console.log(err.response)
            });
        /*  
        axio.put('http://localhost:5000/api/users', userObj)
              .then(res => {
                console.log(res.data)
                 this.props.modelClosed(true);
           })
             .catch(err => {
          console.log(err.response)
         });
         */
            //Redirect to UpdateUserlist
       //  this.props.UserUpdateForm.push('/user-list')

        this.setState({
            name: '',
            department_id: '',
            status:''
        })
    }

  renderDropDownField = ({label, meta: { touched, error } }) => (
    <div class="form-group">
      <label>{label}</label>
      <select
        class="form-control"
        id="exampleFormControlSelect1"
        onChange={e => {
          console.log(e.target.value);
        }}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
  );




  render () {
    const {department, userData} = this.state;

   console.log(this.state.name, 'tttttttttttttttttttttttttttttttttttttttttt');

   

    return (
      <form onSubmit={this.submitFrom}>
          <div className="form-group">
    <label>Name - </label>
            <input type="text" name="name" className="form-control"  value={this.state.name} onChange={this.onChangeName} />
          </div>

          <div className="form-group">
              <label>Department </label>

              <div className="form-group">
                 <select class="custom-select custom-select- mb-3" onChange={this.onChangeDepartmentId} value={this.state.Department} placeholder="Department">
                     {department && department.map(element=>{
                return (
                        <option value={element.id}>{element.department}</option>
                      )
              })}

                <button variant="danger" size="lg" block="block" type="submit" >
                  Update User
                  </button>    
          </select>
          </div>
          </div>

          <div className="form-group">
          <label>Status</label>
          {/* <input type="text" name="status" className="form-control" onChange={this.handleChange} value={this.state.status} placeholder="Status"/> */}

          <div className="form-group">
          <select class="custom-select custom-select- mb-3" onChange={this.onChangeStatus} value={this.state.status} placeholder="Status">
          <option selected>Status</option>
          <option value="1">Active</option>
         <option value="0">Inactive</option>
           
          </select>
          </div>
            
           {/* <input type="radio" value = "Active" name="status" className="form-control" onChange={this.handleChange} value={this.state.status} placeholder="Active"/>
           <input type="radio" value = "Inactive" name="status" className="form-control" onChange={this.handleChange} value={this.state.status} placeholder="Inactive"/>
        * */}
         {/* <select name = "status">
          <option value={this.state.status} >Active</option>
          <option value={this.state.status} >Inactive</option>
          
        </select>   */}
             
          </div>

          <div className="modal-footer">
             <button className="btn btn-success" onClick={this.submitFrom} type="submit" disabled={submit}>
               Submit
               </button>
          </div>


      </form>
    )
  }
}
const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } 

  const validate = values => {
    const errors = {};
    if (!values.department) {
      errors.department = "Required";
    }

  const validate = values => {
    const errors = {};
    if(!values.status) {
      errors.status = "Required";
     }
   }
  }
  return errors;
}

function  mapStateToProps(setState, ownProps, userData) {
  const { data } = ownProps;
    let UserUpdateForm = {};

    if (userData. UserUpdateForm === "") {
      UserUpdateForm = {
          name:userData.name,
          Department:userData.department,
          status:userData.status,
        //  typeSocial: true
      }
  } else if (userData.UserUpdateForm === "") {
    UserUpdateForm = {
          name:  userData.name,
          Department:userData.department,
          status:userData.status,
         // typeSocial: true
      }
  } else {
    UserUpdateForm = {
          name:userData.name,
         // typeSocial: false
      }
  }
  return { initialValues:  UserUpdateForm }

}
//let UserUpdateForm = reduxForm({ validate, form: 'UserUpdateForm', enableReinitialize: true })(UserUpdateForm);
//UserUpdateForm = connect(state => (mapStateToProps), { registeruser })(UserUpdateForm);


export default reduxForm({
  form: "UserUpdateForm",
  validate
})(UserUpdateForm);


