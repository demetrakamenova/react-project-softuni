import React from 'react';

const runControlValidation = (value, validations) => {
    return validations.validate(value, { abortEarly: false });
  };
  
  export const getValidationsRunnerForSchema = schema => form => {
    if (!schema) { return Promise.resolve(); }
    //runs only upto first validator that fails 
    return schema.validate(form, { abortEarly: false })
      .then(() => form).catch(err => {
        //inner r is an array of ValidationErrors throw earlier in the validation chain. When the abortEarly option is false this is where you can inspect each error thrown
        const errors = err.inner.reduce((acc, { path, message }) => {
          
          acc[path] = (acc[path] || []).concat(message);
          return acc;
        }, {});
        return Promise.reject(errors);
      });
  }
  
  const getControlChangeHandler = (validations, setValue, setErrors) => {
    let id;
    return e => {
      const newValue = e.target.value;
      if (id) { clearTimeout(id); id = null; }
      id = setTimeout(() => {
        setValue(newValue);
        runControlValidation(newValue, validations)
          .then(() => {
            setErrors(undefined);
          })
          .catch(err => {
            setErrors(err.errors);
          });
        id = null;
      }, 200);
    };
  };
  
  export const useFormControl = (defaultValue, validations) => {
    const [value, setValue] = React.useState(defaultValue);
    const [errors, setErrors] = React.useState(undefined);
  
    const changeHandler = React.useCallback(
      getControlChangeHandler(validations, setValue, setErrors),
      [validations, setValue, setErrors]
    );
  
    return React.useMemo(() => ({
      value,
      setValue,
      errors,
      setErrors,
      changeHandler
    }), [value, setValue, errors, setErrors, changeHandler]);
  };

export default function withForm(Cmp, initialState, schema) {
    return class extends React.Component {
        state = {
            form: initialState,
            errors: null,
        };

        //save the context
        controlChangeHandlerFactory = name => {
            //async state =>get  previous state  from form
            let id;
            return e => {
                const newValue = e.target.value;
                if (id) { clearTimeout(id); id = null }
                id = setTimeout(() => {
                    this.setState(({ form }) => {
                        return { form: { ...form, [name]: newValue } }
                    });
                    id = null;
                }, 200);
            };
        };

        getFormState = () => {
            return this.state.form;
        };

        
        getFormErrorState = () => {
            return this.state.errors;
        };

        runValidations = () => {
            
            return  schema.validate(this.state.form, { abortEarly: false }).then(()=>{
                this.setState({ errors: null });
                return this.state.form
            }).catch(err => {
                const errors = err.inner.reduce((acc, { path, message}) => {
                    acc[path] = (acc[path] || []).concat(message);
                    return acc;
                }, {});
                this.setState({ errors });
            });
        };

        render() {
            return <Cmp {...this.props} controlChangeHandlerFactory={this.controlChangeHandlerFactory} getFormState={this.getFormState} runValidations={this.runValidations} getFormErrorState={this.getFormErrorState} clearFormErrorState={this.clearFormErrorState} catchServerErrors={this.catchServerErrors}></Cmp>
        }
    }
}