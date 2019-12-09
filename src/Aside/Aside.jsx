import React from 'react';
import Link from '../shared/Link/Link';
import './Aside.css'

function Aside({ children, url }) {
    return (
        <aside className="Aside">
            <ul>
                <Link>Link </Link>
                <Link>Link </Link>
            </ul>
        </aside>
    );
};

export default Aside;