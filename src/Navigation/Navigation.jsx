import React from 'react';
import './Navigation.css'
import Link from '../shared/Link/Link'

function Navigation({ children, url }) {
    return (<nav className="Navigation">
        <ul className="list">
            <Link>
                <img id="logo" src="cooking-brand.png" alt="logo"/>
             </Link>
            <Link>Link </Link>
            <Link>Link </Link>
        </ul>
    </nav>
    );
};

export default Navigation;
