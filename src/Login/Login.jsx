import React from 'react';
import userService from '../services/user-service'
import './Login.css';
import * as yup from 'yup';
import { AuthContext } from "../App/App";

import { useFormControl, getValidationsRunnerForSchema } from '../shared/hocs/withForm';

const validations = {
    username: yup.string()
        .required('Username is required')
        .min(4, 'Username should be more than 4 chars'),

    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be more than 6 chars')
}

const schema = yup.object().shape(validations);
const validationsRunner = getValidationsRunnerForSchema(schema);

const Login = () => {

    const { dispatch } = React.useContext(AuthContext);
    const usernameFormControl = useFormControl('', validations.username);
    const passwordFormControl = useFormControl('', validations.password);
    const [serverError, setServerError] = React.useState(null);

    const submitHandler = React.useCallback(() => {
        validationsRunner({
            username: usernameFormControl.value,
            password: passwordFormControl.value
        }).then((data) => {
           
            userService.login(data).then((data) => {
       
                        dispatch({
                            type: "LOGIN",
                            payload: data
                        });
                  
            }).catch(e => {
                setServerError("Wrong password or username");
            });
        }).catch(errors => {

            if (errors.username) { usernameFormControl.setErrors(errors.username); }
            if (errors.password) { passwordFormControl.setErrors(errors.password); }
        })
    }, [usernameFormControl, passwordFormControl, dispatch]);
 
    return (

        <form className="Login">
            <div className= "form-control">{(serverError) && <div className="error">{serverError}</div>}</div>
            <div className="form-control">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={usernameFormControl.changeHandler} />
                {usernameFormControl.errors && usernameFormControl.errors[0]}
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={passwordFormControl.changeHandler} />
                {passwordFormControl.errors && passwordFormControl.errors[0]}
            </div>
            <div className="form-control"><button type="button" onClick={submitHandler}>Login</button></div>
        </form>
    );
};

export default Login;