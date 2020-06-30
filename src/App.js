import React, { useState } from 'react';
import SignInSignUp from './pages/signInSignUp';

const App = () => {
    const [user, setUser] = useState(2);

    return <>{user ? <SignInSignUp /> : <h1>No estas logeado</h1>}</>
}

export default App;