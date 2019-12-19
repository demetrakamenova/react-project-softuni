import React from 'react';
import './Profile.css';
import taskService from '../services/tasks-service';

function Profile({ user, userId
}) {

    // const [tasks, setTasks] = React.useState(null);
    const [completed, setCompleted] = React.useState(null);
    const [inProgress, setInProgress] = React.useState(null);

    React.useEffect(() => {

        console.log(user);
        taskService.getUserTasks(userId).then((tasks) => {
            // setTasks(tasks);
            const getCompletedByUser = tasks.filter((task) => {
                return task.completedFrom === userId;
            }).length;

            const getInProgressByUser = tasks.filter((task) => {
                return task.inProgress === userId;
            }).length;

            setCompleted(getCompletedByUser);
            setInProgress(getInProgressByUser);
        });

    }, []);

    return (
        <div className="Profile">
            <div>
                <img src="profile-img.png" alt="profile" />
                <p>
                    <span>Username: </span>
                    {user}
                </p>
                {completed ? <p>
                    <span>Completed tasks: </span>
                    {completed}
                </p> : <p>
                        <span>Completed tasks: </span>
                        0
                </p>}
                {inProgress ? <p>
                    <span>In Progress: </span>
                    {inProgress}
                </p> : <p>
                        <span>In Progress: </span>
                        0
                </p>}
            </div>
        </div>
    );
};

export default Profile;