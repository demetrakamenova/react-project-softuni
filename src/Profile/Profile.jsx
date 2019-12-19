import React from 'react';
import './Profile.css';

function Profile() {
    return (
        <div className="Profile">
            <div>
                <img src="profile-img.png" alt="profile"/>
                <p>
                    <span>Username: </span>
                    MyUserName
                </p>
                <p>
                    <span>Completed tasks: </span>
                    3000
                </p>
                <p>
                    <span>In Progress: </span>
                    3000
</p>

                <p>
                    <span>Publications: </span>
                    3000
</p>
            </div>
        </div>
    );
};

export default Profile;