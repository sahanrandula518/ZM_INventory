import React, { Component } from 'react';
import axio from "axios";
import { Redirect } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form';


export class LoginForm extends Component {

  constructor(props) {
    super(props);
  }


  renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <div className='form-group'>
        <label>{label}</label>

        <input
          {...input}
          type={type}
          className='form-control'
          autoComplete='off'
          style={{ width: '100%' }}
        />
        {touched &&
          ((error && (
            <span className='form-text text-muted'>
              <p style={{ color: 'red' }}>{error}</p>
            </span>
          )) ||
            (warning && (
              <span className='form-text text-muted'>
                <p style={{ color: 'red' }}> {warning}</p>
              </span>
            )))}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
    console.log('FormValues to the Action:', formValues);
    axio.post('http://localhost:5000/api/users/login', formValues)
         .then(res => {
           console.log("login function")
           console.log(res.data)

           const success = res.data.success;
           console.log(success)
           
          if(success){

            this.context.router.history.push('/users');
            
          }else{
            console.log("Login failed")
          }

         })
         .catch(err => {
           console.log(err.response)
         });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className='text-center'>
          <h1>Login</h1>
          <p className='text-muted'>Login to your account</p>
        </div>
        <Field
          name='email'
          type='email'
          component={this.renderField}
          label='Email'
        />
        <Field
          name='password'
          type='password'
          component={this.renderField}
          label='Password'
        />

        <button
          type='submit'
          // disabled={submitting}
          className='btn btn-success'
          style={{
            display: 'block',
            width: '100%',
            fontSize: 18,
            marginTop: 20,
            border:'1px solid white'
          }}
        >
          Sign In
        </button>
      </form>
    );
  }
}
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'LoginForm',
  validate: validate
})(LoginForm);
