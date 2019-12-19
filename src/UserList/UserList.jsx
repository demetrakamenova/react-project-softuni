import React from 'react';
import './UserList.css';
import '../TRow/TRow';
import TRow from '../TRow/TRow';
import userService from '../services/user-service';


function UserList() {

    let limit = 0;
    const [users, setUsers] = React.useState(null);

    React.useEffect(() => {
        userService.getUsers().then(users => {
            // console.log(users);
            setUsers(users);
        });
    }, [limit]);

    return (
        <div>
            {users ?
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Completed</th>
                        <th>Permissions</th>
                    </tr>
                    {users.map((user) =>
                        <TRow key={user._id} userId={user._id} username={user.username}  completed={user.completed} />)}
                </table> : <div>Loading...</div>}
        </div>
    );
};

export default UserList;