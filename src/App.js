import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SignInSignUp from './pages/signInSignUp';

const App = () => {
    const [user, setUser] = useState(2);

    return <>
        {
            user
                ? <SignInSignUp />
                : <h1>No estas logeado</h1>
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
    </>
}

export default App;