import React from 'react';
import './App.css';
import BasicForm from './BasicForm';
import YupValidationForm from './YupValidationForm';

function App() {
  return (
    <div className="App">
      <h1>Basic Form</h1>
      <BasicForm />
      <h1>Yup Validation Form</h1>
      <YupValidationForm />
    </div>
  );
}

export default App;
