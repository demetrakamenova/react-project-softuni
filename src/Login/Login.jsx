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
    // submitHandler = () => {
    //     // this.props.clearFormErrorState()

    //     this.props.runValidations().then(formData => {
    //         const errors = this.props.getFormErrorState();
    //         console.log(errors);

    //         if (!!errors) {
    //             //debugger;
    //             return;
    //         }

    //         const data = this.props.getFormState();

    //         userService.login(data).then((data) => {
    //             console.log(data);
    //              storage.saveUser(data);
    //              this.props.history.push('/');
    //         }).catch(e=>{
    //             this.setState({errors: 'Wrong password or username'})
    //         });
    //         // console.log(formData);
    //     });
    //     // const { username, password, rePassword } = this.props.getFormState();
    //     // console.log(username, password, rePassword);
    // }

    // getFirstInputError = (name) => {
    //     const errorState = this.props.getFormErrorState();
    //     //if it exists return the last value else return the first(falsy)
    //     return errorState && errorState[name] && errorState[name][0];
    // }





    // const usernameError = this.getFirstInputError('username');
    // const passwordError = this.getFirstInputError('password');

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
                {/* {state.error && state.error} */}
            </div>
            <div className="form-control"><button type="button" onClick={submitHandler}>Login</button></div>
        </form>

    );

};

// const initialFormState = {
//     username: '',
//     password: '',
// };

// const schema = yup.object({
//     username: yup.string('Username must be a string')
//         .required('Username is required')
//         .min(4, 'Username must be more then 6 chars'),

//     password: yup.string('Password must be a string')
//         .required('Password is required')
//         .min(6, 'Password must be more than 6 chars'),
// });

export default Login;