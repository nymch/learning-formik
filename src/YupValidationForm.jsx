import React from 'react';
import { Formik, Form, Field } from 'formik';
import FormInitialValues from './FormInitialValues';
import * as Yup from 'yup';
import _ from 'lodash';
import './Form.css';

const formSchema = Yup.object().shape({
  handleName: Yup.string().required('必須です'),
  email: Yup.string().email('有効なメールアドレスを入力してください').required('必須です'),
  birthDate: Yup.date().required('必須です').typeError('正しい日付を入力してください'),
  hobby: Yup.string().required('必須です'),
})

const YupValidationForm = () => {
  return (
    <Formik
      initialValues={FormInitialValues}
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
      validationSchema={formSchema}
      validateOnBlur={true}
      validateOnChange={true}
      onReset={(values, actions)=>{
        actions.setFieldValue(FormInitialValues)
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
            {isValid && !isSubmitting && <span className="form-valid">Valid input!</span>}
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

export default YupValidationForm;