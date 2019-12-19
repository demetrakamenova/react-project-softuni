const appKey = 'kid_rkuQ7DApS';


function reloadToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
}

function makeRequest(baseUrl, headers) {

    function handler(response) {
        if (response.status >= 400) {
            throw Error('Error:');
        }
        return response.json();
    }

    return fetch(baseUrl, headers)
        .then(handler)
        .then((res) => res)
        .catch(err => {
            console.log(err + ' ' + err.status);
        });
}

const taskService = {

    getAllTasks: function () {


        let token = reloadToken();
        const auth = {
            'Content-Type': 'application/json',
            Authorization: `Kinvey ${token}`
        };

        const baseUrl = ` https://baas.kinvey.com/appdata/${appKey}/tasks?query={"isOpen": true}`;
        const headers = {
            method: 'GET',
            headers: auth,
        };
        console.log(token);
        //  debugger;
        return makeRequest(baseUrl, headers);
    },

    getTasksInProgress: function () { //{ $not: { $gt: 1.99 }

        const token = reloadToken();
        const auth = {
            'Content-Type': 'application/json',
            Authorization: `Kinvey ${token}`
        };
        const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/tasks/?query={"inProgress":{"$ne": null}}`;
        const headers = {
            method: 'GET',
            headers: auth,
        };

        return makeRequest(baseUrl, headers);
    },

    getPendingTasks: function () {
        let token = reloadToken();
        const auth = {
            'Content-Type': 'application/json',
            Authorization: `Kinvey ${token}`
        };

        const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/tasks/?query={"pendingApproval": {"$ne": null}}`;
        const headers = {
            method: 'GET',
            headers: auth,
        };

        return makeRequest(baseUrl, headers);
    },

    getCompletedTasks: function () {
        let token = reloadToken();
        const auth = {
            'Content-Type': 'application/json',
            Authorization: `Kinvey ${token}`
        };
        const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/tasks/?query={"completedFrom": {"$ne": null}}`;
        const headers = {
            method: 'GET',
            headers: auth,
        };

        return makeRequest(baseUrl, headers);
    },

    getCompletedTasksByUser: function (userId) {
        let token = reloadToken();
        const auth = {
            'Content-Type': 'application/json',
            Authorization: `Kinvey ${token}`
        };
        const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/tasks/?query={"completedFrom": "${userId}"}`;
        const headers = {
            method: 'GET',
            headers: auth,
        };

        return makeRequest(baseUrl, headers);
    },

    getCurrentTask: function (id) {
        let token = reloadToken();
        const auth = {
            'Content-Type': 'application/json',
            Authorization: `Kinvey ${token}`
        };
        const baseUrl = ` https://baas.kinvey.com/appdata/${appKey}/tasks/${id}`;
        const headers = {
            method: 'GET',
            headers: auth,
        };

        return makeRequest(baseUrl, headers);
    },

    getUserTasks: function (userId) {
        let token = reloadToken();
        const auth = {
            'Content-Type': 'application/json',
            Authorization: `Kinvey ${token}`
        };
        const baseUrl = ` https://baas.kinvey.com/appdata/${appKey}/tasks/?query={"$or":[{"completedFrom":"${userId}"}, {"inProgress":"${userId}"}]}`;
        const headers = {
            method: 'GET',
            headers: auth,
        };

        return makeRequest(baseUrl, headers);
    },

    createTask: function (data) {
        //console.log(data);
        let token = reloadToken();
        const auth = {
            'Content-Type': 'application/json',
            Authorization: `Kinvey ${token}`
        };
        data.isOpen = true;
        data.publicationDate = Date.now();

        const baseUrl = ` https://baas.kinvey.com/appdata/${appKey}/tasks`;
        const headers = {
            'Content-Type': 'application/json',
            body: JSON.stringify(data),
            method: 'POST',
            headers: auth,
        };

        return makeRequest(baseUrl, headers);
    },

    deleteTask: function (id) {
        let token = reloadToken();
        const auth = {
            'Content-Type': 'application/json',
            Authorization: `Kinvey ${token}`
        };
        const baseUrl = ` https://baas.kinvey.com/appdata/${appKey}/tasks/:${id}`;
        const headers = {
            method: 'DELETE',
            headers: auth,
        };

        return makeRequest(baseUrl, headers);
    },

    editTask: function (data, id) {
        let token = reloadToken();
        const auth = {
            'Content-Type': 'application/json',
            Authorization: `Kinvey ${token}`
        };
        const baseUrl = ` https://baas.kinvey.com/appdata/${appKey}/tasks/${id}`;
        const headers = {
            // 'Content-Type': 'application/json',
            body: JSON.stringify(data),
            method: 'PUT',
            headers: auth,
        };

        return makeRequest(baseUrl, headers);
    },
};

export default taskService;