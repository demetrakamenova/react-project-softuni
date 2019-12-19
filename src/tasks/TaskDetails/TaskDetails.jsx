import React from 'react';
import '../TaskDetails/TaskDetails.css';
import taskService from '../../services/tasks-service';

class TaskDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: { },
            id: this.props.match.params.id,
            userId: this.props.location.state.userId,
        };
    }

    handleStartTask = () => {

       const data = this.state.data;
        const itemInfo = {
            ...data,
            isOpen : false,
            openingDate : Date.now(),
            inProgress : this.state.userId,
        }
 
        taskService.editTask(itemInfo,this.state.id).then((data) => {
            this.props.history.push('/user-tasks')
        });
    }

    componentDidMount() {
        taskService.getCurrentTask(this.state.id).then((data) => {
            this.setState({
                data: data
            });
        });
    }

    render() {
        return (
            <div className="TaskDetails">
                <h2>{this.state.data.title}</h2>
                <p>{this.state.data.description}</p>
                <p>Published: <b>{new Date(this.state.data.publicationDate).toLocaleDateString()}</b></p>

                {/* <button className="btn-details">Edit</button> */}
                <button className="btn-details-start" onClick={this.handleStartTask}>Start</button>
            </div>
        );
    }
};

export default TaskDetails;