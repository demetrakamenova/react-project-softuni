import React from 'react';
import userService from '../../../services/user-service';
import './Task.css';
import taskService from '../../../services/tasks-service';


function Task({ title, children, author, id, ...props }) {

    const [user, setUser] = React.useState(null);
    const [deleted, setDeleted] = React.useState(null);
    const [info, setInfo] = React.useState(null);

    React.useEffect(() => {
        //the if of the user
        const statusId = props.inProgress || props.completed;;
        // make additional requests for the username (selected by id)

        if (statusId) {
            //make request only if any of the props exist and get the id to find the user
            userService.getUser(statusId).then((user) => {
                setUser(user);
            });
        }

    }, []);

    function handleBtnDetailsView() {
        props.history.push({
            pathname: `/task-details/${id}`,
            state: { userId: props.userId }
        });
    }

    function handleBtnEndTask() {

        taskService.getCurrentTask(id).then((task) => {

            const data = task;
            const itemInfo = {
                ...data,
                pendingApproval: task.inProgress,
                inProgress: null,
            }

            taskService.editTask(itemInfo, task._id).then((data) => {
                setInfo("Success");
                setTimeout(() => setInfo(null), 2000);
                setDeleted(true);
            });
        });
    }

    function handleBtnApproval() {

        taskService.getCurrentTask(id).then((task) => {

            const data = task;
            const itemInfo = {
                ...data,
                completedFrom: data.pendingApproval,
                pendingApproval: null,
            }

            taskService.editTask(itemInfo, task._id).then((data) => {
                setInfo("Success");
                setTimeout(() => {
                    setInfo(null);
                }, 2000);
                setDeleted(true);
            });
        });
    }

    function handleBtnReject() {

        taskService.getCurrentTask(id).then((task) => {
            const data = task;
            console.log(props._id);
            const itemInfo = {
                ...data,
                completedFrom: null,
                pendingApproval: null,
                inProgress: data.pendingApproval,
            }

            taskService.editTask(itemInfo, task._id).then(() => {
                setInfo("Success");
                setTimeout(() => {
                    setInfo(null);
                }, 2000);
                setDeleted(true);
            });
        });
    }

    return deleted ? info && <div className="card notifications"><h1>{info}</h1></div> : (

        <div className="card">
            <h2>{title}</h2>
            <p className="title"><b>{children}</b></p>
            <p>Author: {author}</p>
            {user ?
                <div>
                    {props.inProgress && <div><p className="in-progress"> In Progress</p><p className="in-progress">Worker: {user.username}</p></div>}
                    {props.inProgress === props.userId ? <button className="in-progress" userId={props.userId} onClick={handleBtnEndTask}>End</button> : null}
                    {props.completed && <p className="completed">Completed by:{user.username}</p>}
                    {/* {props.pending && <p className="in-progress">Worker :{user.username}</p>} */}
                </div> : null}

            {props.typeList === "open" ? <p><button className="task-details" userId={props.userId} onClick={handleBtnDetailsView}>Details</button></p> : null}
            {props.typeList === "pending" ? <p><button className="accept" userId={props.userId} onClick={handleBtnApproval}>OK</button>
                <button className="reject" userId={props.userId} onClick={handleBtnReject}>NO</button>
            </p> : null}
        </div>
    );
};

export default Task;