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
    const valid = scheme[key].test(val);
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
  date: (separator) => new RegExp(`(19|20)[0-9]{2}\\${separator ? separator : '/'}(0[1-9]|1[0-2])\\${separator ? separator : '/'}(0[1-9]|[1-2][0-9]|3[0-1])`),
}

const scheme = {
  handleName: regex.text(20),
  email: regex.text(),
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
      onReset={formInitialValues}
      render={({ errors, status, touched, isSubmitting, isValid }) => (
        <Form autocomplete="off">
          <div>
            <Field type="text" name="handleName" className="form-input" placeholder="JohnDoe" />
            {errors.handleName && touched.handleName && <div className="form-error">{errors.handleName}</div>}
          </div>
          <div>
            <Field type="email" name="email" className="form-input" placeholder="john@doe.gg"/>
            {errors.email && touched.email && <div className="form-error">{errors.email}</div>}
          </div>
          <div>
            <Field type="text" name="birthDate" className="form-input" placeholder="1970/01/01" />
            {errors.birthDate && touched.birthDate && <div className="form-error">{errors.birthDate}</div>}
          </div>
          <div>
            <Field type="text" name="hobby" className="form-input" placeholder="Sleeping" />
            {errors.hobby && touched.hobby && <div className="form-error">{errors.hobby}</div>}
          </div>
          {isSubmitting && <div>submitting.....</div>}
          {status && status.message && <div className="form-error">{status.message}</div>}
          {isValid && <div style={{color:"green",fontSize:16,fontWeight:"bolder"}}>Valid input!</div>}
          <button type="submit" disabled={isSubmitting || !isValid}>
            Submit
          </button>
        </Form>
      )}/>
  )
}

export default BasicForm;