import React from 'react';
import taskService from '../../services/tasks-service';
import './CreateTask.css';
import withForm from '../../shared/hocs/withForm';
import * as yup from 'yup';


class CreateTask extends React.Component {

    taskTitleChangeHandler = this.props.controlChangeHandlerFactory('title');
    taskDescOnChangeHandler = this.props.controlChangeHandlerFactory('description');
   

    submitHandler = () => {

        this.props.runValidations().then(formData => {
            const errors = this.props.getFormErrorState();
            console.log(errors);

            if (!!errors) {
                //debugger;
                return;
            }

            const data = this.props.getFormState();
            data.author = this.props.username;
        
            taskService.createTask(data).then(() => {
               this.props.history.push('/tasks');
            });

        });
    }

    getFirstInputError = (name) => {
        const errorState = this.props.getFormErrorState();
        //if it exists return the last value else return the first(falsy)
        return errorState && errorState[name] && errorState[name][0];
     }

    render() {

        const taskTitleError = this.getFirstInputError('title');
        const taskDescError = this.getFirstInputError('description');

        return (
            <div className="CreateTask">
                <form>
                    <div className="form-control">
                        <label className="create-task" htmlFor="task-title">Task Title</label>
                        <input type="text" name="title" id="task-title" className="create-task" onChange={this.taskTitleChangeHandler}/>
                        {taskTitleError && <div className="error">{taskTitleError}</div>}
                        <textarea placeholder="Write description" onChange={this.taskDescOnChangeHandler}></textarea>
                        {taskDescError && <div className="error">{taskDescError}</div>}
                        <button type="button" onClick={this.submitHandler}>Add</button>
                    </div>

                </form>
            </div>
        );
    }
};

const initialFormState = {
    title: '',
    description: '',
};

const schema = yup.object({
    title: yup.string('Title must be a string')
        .required('Title is required')
        .min(6, 'Title must be more then 6 chars'),

    description: yup.string('Description must be a string')
        .required('Description is required')
        .min(9, 'Description must be more than 9 chars'),
});

export default withForm(CreateTask, initialFormState, schema);