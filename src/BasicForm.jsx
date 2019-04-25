import React from 'react';
import { Formik, Field, Form } from 'formik';
import './BasicForm.css';
import _ from 'lodash';

const formInitialValues = {
  handleName: '',
  email: '',
  birthDate: '',
  hobby: '',
}

// self-made validator (not so cool).
const validate = (values) => {
  const result = _.reduce(values, (col,val,key) => {
    const valid = schema[key].test(val);
    if(!valid){
      return {...col, [key]:'invalid'};
    }
    return col;
  },{});
  return result;
}

const regex = {
  text: (length) => new RegExp(`^[a-zA-Z0-9]${length ? '{1,' + length + '}' : '+'}$`),
  number: (length) => new RegExp(`^[0-9]${length ? '{1,' + length + '}' : '+'}$`),
  email: () => new RegExp(`^[a-zA-Z0-9\\.\\-_]+@([a-zA-Z0-9\\-]+\\.)+[a-z]+$`),
  date: (separator) => new RegExp(`(19|20)[0-9]{2}\\${separator ? separator : '/'}(0[1-9]|1[0-2])\\${separator ? separator : '/'}(0[1-9]|[1-2][0-9]|3[0-1])`),
}

const schema = {
  handleName: regex.text(20),
  email: regex.email(),
  birthDate: regex.date('/'),
  hobby: regex.text(100),
}

const BasicForm = () => {
  return (
    <Formik
      initialValues={formInitialValues}
      isInitialValid={false}
      onSubmit={(values, actions) => {
        actions.setStatus({});
        setTimeout(()=>{
          actions.setSubmitting(false);
          if(_.random(0,10) < 5) {
            actions.setStatus({message:'something wrong.'});
          }
        },1000);
      }}
      validate={(values)=>{
        return validate(values);
      }}
      validateOnBlur={true}
      validateOnChange={false}
      onReset={(values, actions)=>{
        actions.setFieldValue(formInitialValues)
      }}
      render={({ errors, status, touched, isSubmitting, isValid }) => (
        <Form autocomplete="off" className="form">
          <div>
            <label for="handleName">Handle name: </label>
            <Field type="text" name="handleName" className="form-input" placeholder="JohnDoe" />
            {errors.handleName && touched.handleName && <span className="form-error">{errors.handleName}</span>}
          </div>
          <div>
            <label for="email">Email: </label>
            <Field type="email" name="email" className="form-input" placeholder="john@doe.gg"/>
            {errors.email && touched.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div>
            <label for="handleName">Birth date: </label>
            <Field type="text" name="birthDate" className="form-input" placeholder="1970/01/01" />
            {errors.birthDate && touched.birthDate && <span className="form-error">{errors.birthDate}</span>}
          </div>
          <div>
            <label for="handleName">Hobby: </label>
            <Field type="text" name="hobby" className="form-input" placeholder="Sleeping" />
            {errors.hobby && touched.hobby && <span className="form-error">{errors.hobby}</span>}
          </div>
          <div>
            {isSubmitting && <div>submitting.....</div>}
            {status && status.message && <span className="form-error">{status.message}</span>}
            {isValid && <span className="form-valid">Valid input!</span>}
            <button type="submit" disabled={isSubmitting || !isValid}>
              Submit
            </button>
            <button type="reset">
              Reset
            </button>
          </div>
        </Form>
      )}/>
  )
}

export default BasicForm;