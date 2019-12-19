import React from 'react';
import Link from '../shared/Link/Link';
import './Aside.css';
import { AuthContext } from '../App/App';


function Aside() {
    const userInfo = React.useContext(AuthContext);
    return (
        <aside className="Aside">
            <ul>
                {userInfo.state.isAuthenticated && <Link to="/profile">Profile</Link>}
                {userInfo.state.isAuthenticated && <Link to="/user-tasks">My tasks</Link>}

                {userInfo.state.isAdmin && <Link to="/create-task">New Task</Link>}
                {userInfo.state.isAdmin && <Link to="/pending-tasks">Pending</Link>}
                {userInfo.state.isAdmin && <Link to="/manage-list">Permissions</Link>}
            </ul>
        </aside>
    );
};

export default Aside;