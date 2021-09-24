import axios from 'axios';

export default {
    // called when the user attempts to log in
    login: ({name, password }) => {
        const request = new Request('http://3.36.115.215:8000/account/sign-in', {
            method: 'POST',
            body: JSON.stringify({ name, password }),

        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300){
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({token, apikey, secretkey})=> {
                console.log("token " + token, "apikey " + apikey, "secret_key " + secretkey );
                localStorage.setItem('token', token);
                localStorage.setItem('name', name);
                localStorage.setItem('apikey', apikey);
                localStorage.setItem('secretkey', secretkey)
            })
            .catch((error)=> {
                console.log(error)
            });
    },
    createAccount: ({name, password}) => {
        const request = new Request('http://3.36.115.215:8000/account/', {
            method: 'POST',
            body: JSON.stringify({ name, password }),

        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300){
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({name})=> {
                localStorage.setItem('name', name);
                console.log(localStorage.getItem('name'));
            })
            .catch(()=> {
                throw new Error('Network error')
            });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('token', 'name');
        return Promise.resolve('/login');
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('name');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        console.log("This is the token " + localStorage.getItem('token'));
        return localStorage.getItem('name')
            ? Promise.resolve('/')
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),

    // get the current user identity
    getIdentity: () => Promise.resolve({
        id: localStorage.getItem('name'),
        fullName: localStorage.getItem('name'),
    }),
};