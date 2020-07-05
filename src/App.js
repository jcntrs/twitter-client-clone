import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { isUserLoggedAPI } from './api/auth';
import SignInSignUp from './pages/signInSignUp';
import AuthContext from './contexts/auth/AuthContext';

const App = () => {
    const [user, setUser] = useState();
    const [checlLogin, setCheckLogin] = useState(false);
    const [userLoading, setUserLoading] = useState(false);

    useEffect(() => {
        setUser(isUserLoggedAPI());
        setCheckLogin(false);
        setUserLoading(false)
    }, [checlLogin]);

    /*     if (!userLoading) return null; */

    return (
        <AuthContext.Provider value={user}>
            {
                user
                    ? <h1>Estás logeado</h1>
                    : <SignInSignUp setCheckLogin={setCheckLogin} />
            }
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
        </AuthContext.Provider>
    )
}

export default App;