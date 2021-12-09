
const appKey = '';
const appSecret = '';

function handler(response) {
    if (response.status >= 400) {
        throw Error('Error:');
    }
    return response.json();
}

const userService = {

    register: function (data) {

        const auth = {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(appKey + ':' + appSecret),
        };
        const userData = {
            username: data.username,
            password: data.password
        }
        const baseUrl = `https://baas.kinvey.com/user/${appKey}`;
        const headers = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(userData),
            headers: auth,
        };

        return fetch(baseUrl, headers)
            .then(handler)
            .then((res) => console.log(res))
            .catch(err => {
                console.log(err + ' ' + err.status);
            });
    },

    login: function (data) {

        const auth = {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(data.username + ':' + data.password),
        };
        const baseUrl = `https://baas.kinvey.com/user/${appKey}/login`;
        const headers = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: auth,
        };

        return fetch(baseUrl, headers)
            .then(handler)
            .then((res) => res)
    },


    logout: function () {

        const token = JSON.parse(localStorage.getItem('token'));
        const auth = {
            Authorization: `Kinvey ${token}`
        };
        const baseUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
        const headers = {
            method: 'POST',
            headers: auth,
        };

        return fetch(baseUrl, headers)
            .then(handler)
            .then((res) => console.log(res.json()))
            .catch(err => {
                console.log(err + ' ' + err.status);
            });
    },

    getUser: function (id) {

        const token = JSON.parse(localStorage.getItem('token'));
        const auth = {
            Authorization: `Kinvey ${token}`
        };
        const baseUrl = `https://baas.kinvey.com/user/${appKey}/${id}`;
        const headers = {
            headers: auth,
        };

        return fetch(baseUrl, headers)
            .then(handler)
            .then((res) => res)
            .catch(err => {
                console.log(err + ' ' + err.status);
            });
    },

    getUsers: function () {

        const token = JSON.parse(localStorage.getItem('token'));
        const auth = {
            Authorization: `Kinvey ${token}`
        };
        const baseUrl = `https://baas.kinvey.com/user/${appKey}?query={"isAdmin": null}`;
        const headers = {
            headers: auth,
        };

        return fetch(baseUrl, headers)
            .then(handler)
            .then((res) => res)
            .catch(err => {
                console.log(err + ' ' + err.status);
            });
    },

    updateUser: function (id) {

        const token = JSON.parse(localStorage.getItem('token'));
        const auth = {
            'Content-Type': 'application/json',
            Authorization: `Kinvey ${token}`,
        };
        const baseUrl = `https://baas.kinvey.com/user/${appKey}/${id}`;
        const headers = {
            method: 'PUT',
            body: JSON.stringify({
                isAdmin: 1
            }),
            headers: auth,
        };

        return fetch(baseUrl, headers)
            .then(handler)
            .then((res) => console.log(res))
            .catch(err => {
                console.log(err + ' ' + err.status);
            });
    },
};

export default userService;
