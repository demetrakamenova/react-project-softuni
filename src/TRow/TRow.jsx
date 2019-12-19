import React from 'react';
import './TRow.css';
import taskService from '../services/tasks-service';
import userService from '../services/user-service';

function TRow({ username, userId }) {
    const [userCompleted, setUserCompleted] = React.useState(null);
    const [deleted, setDeleted] = React.useState(null);
    const [info, setInfo] = React.useState(null);

    React.useEffect(() => {
        taskService.getCompletedTasksByUser(userId).then(data => {
            const userInfo = { [userId]: Array.from(data).length };
            setUserCompleted(userInfo);
        })
    }, []);

    function handleChangePermissions(e) {

        userService.updateUser(userId).then(() => {
                setInfo("Success");
                setTimeout(() => setInfo(null), 2000);
                setDeleted(true);
        });
    }

    return deleted ? info && <div className="card notifications"><h1>{info}</h1></div> :(
        <tr>
            <td>{username}</td>
            {userCompleted && <td>{userCompleted[userId]}</td>}
            <td><button className="permissions" onClick={(e)=> {handleChangePermissions(e)}}>ADD ADMIN</button></td>
        </tr>
    );
};

export default TRow;