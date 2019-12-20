import React from 'react';

import './Register.css';
import withForm from '../shared/hocs/withForm';
import * as yup from 'yup';
import userService from '../services/user-service';


class Register extends React.Component {

    usernameOnChangeHandler = this.props.controlChangeHandlerFactory('username');
    passwordOnChangeHandler = this.props.controlChangeHandlerFactory('password');
    rePasswordOnChangeHandler = this.props.controlChangeHandlerFactory('rePassword');

    submitHandler = () => {

        //TO DO 
        //this.props.clearFormErrorState()
        //props from high order function withForm
        this.props.runValidations().then(formData => {
            const errors = this.props.getFormErrorState();
            console.log(errors);

            if (!!errors) {
                //debugger;
                return;
            }

            const data = this.props.getFormState();
            userService.register(data).then(() => {
               // return   
               this.props.history.push('/login');
            });
        });
    }

    getFirstInputError = (name) => {
        const errorState = this.props.getFormErrorState();
        //if it exists return the last value else return the first(falsy)
        return errorState && errorState[name] && errorState[name][0];
    }

    render() {
    
        const usernameError = this.getFirstInputError('username');
        const passwordError = this.getFirstInputError('password');
        const rePasswordError = this.getFirstInputError('rePassword');

        return (
            <form className="Login">

                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" onChange={this.usernameOnChangeHandler} />
                    {usernameError && <div className="error">{usernameError}</div>}
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={this.passwordOnChangeHandler} />
                    {passwordError && <div className="error">{passwordError}</div>}
                </div>
                <div className="form-control">
                    <label htmlFor="re-password">Re-Password</label>
                    <input type="password" id="re-password" onChange={this.rePasswordOnChangeHandler} />
                    {rePasswordError && <div className="error">{rePasswordError}</div>}
                </div>
                <div className="form-control"><button type="button" onClick={this.submitHandler}>Register</button></div>
            </form>

        );
    }
}

const initialFormState = {
    username: '',
    password: '',
    rePassword: '',
};

const schema = yup.object({
    username: yup.string('Username must be a string')
        .required('Username is required')
        .min(4, 'Username must be more then 4 chars'),

    password: yup.string('Password must be a string')
        .required('Password is required')
        .min(6, 'Password must be more than 6 chars'),

    rePassword: yup.string('Password must be a string')
        .oneOf([yup.ref('password'), null], 'Password don\'t match')
        .required('Password is required')
        .min(6, 'Password must be more than 6 chars'),
});
export default withForm(Register, initialFormState, schema);