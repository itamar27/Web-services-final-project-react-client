import { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import ReactRouter from '../Router/router';
import { UserContext } from '../userContext';
import auth from '../auth';
import axios from 'axios';
import { URL } from '../constants';

export default function MainApp(){

    const [user, setUser] = useState(null);
    const history = useHistory();
    const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);
    let isLoggedIn = false;

    const login = () => {
        const token = window.localStorage.getItem('userData');
        if (token === null) {
            setUser();
        } else {
            auth(token, setUser, history);
        }
    };

    const logout = (e) => {
        e.preventDefault();
        setUser(null);
        axios.get(URL + 'auth/logout', { withCredentials: true, credentials: 'include' })
            .then(response => console.log(response.data))
            .catch(err => console.log(err));
        history.push({
            pathname: `/`
        });
        window.localStorage.removeItem('userData');
    };

    useEffect(() => {
        login();
    }, []);

    return (
        <>
            <UserContext.Provider value={ { user: userProvider.user, setUser: userProvider.setUser, login: login, logout, isLoggedIn } }>
                <Navbar />
                <ReactRouter />
                <Footer />
            </UserContext.Provider>
        </>
    )
};