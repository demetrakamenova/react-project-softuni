import React from 'react';
import './Navigation.css';
import Link from '../shared/Link/Link'
import { AuthContext } from '../App/App';

function Navigation() {

    const userInfo = React.useContext(AuthContext);

    return (<nav className="Navigation">
        <ul className="list">
            <Link>
                <img id="logo" src="https://unfuddle.com/assets/product-summary-tasks-5a6d6625ed37fb42e18a61c2c24087ee.png" alt="logo" />
            </Link>

          
            {userInfo.state.isAuthenticated && <Link to="/tasks"> Tasks </Link>}
            {userInfo.state.isAuthenticated && <Link to="/task-in-progress">In progress</Link>}
            {userInfo.state.isAuthenticated && <Link to="/completed-tasks">Completed Tasks</Link>}
            {userInfo.state.isAuthenticated && <Link to="/logout">Logout</Link>}
            {!userInfo.state.isAuthenticated && <Link to="/login">Login</Link>}
            {!userInfo.state.isAuthenticated && <Link to="/register">Register</Link>}

        </ul>
    </nav>
    );
};

export default Navigation;
