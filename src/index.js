import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
//import * as yup from 'yup';

// const schema = yup.object({
//     password: yup.string('Password must be a string')
//         .required('Password is required')
//         .min(6, 'Password must be more than 6 chars'),
//     rePassword: yup.string('Password must be a string')
//         .oneOf([yup.ref('password'), null], 'Password don\'t match')
//         .required('Password is required')
//         .min(6, 'Password must be more than 6 chars'),
// });

ReactDOM.render( < App / > , document.getElementById('root'));