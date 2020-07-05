import jwtDecode from 'jwt-decode';
import jwtValid from 'jwt-valid';

const baseURL = process.env.REACT_APP_API_URL

export const signUpAPI = user => {
    const url = `${baseURL}/registro`;
    const tempUser = {
        ...user,
        email: user.email.toLowerCase(),
        birthdate: new Date()
    };

    delete tempUser.repeatPassword;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tempUser)
    };

    return fetch(url, params).then(response => {
        if (response.status >= 200 && response.status < 300) return response.json();
        return { code: 404, message: 'Email no disponible' };
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    });
}

export const signInAPI = user => {
    const url = `${baseURL}/login`;

    const userData = {
        ...user,
        email: user.email.toLowerCase()
    }

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }

    return fetch(url, params).then(response => {
        if (response.status >= 200 && response.status < 300) return response.json();
        return { message: 'Usuario o contraseña incorrectos' }
    }).catch(err => {
        return err;
    });
}

export const setTokenAPI = token => {
    localStorage.setItem('token', token);
}

export const getTokenAPI = token => {
    return localStorage.getItem('token');

}

export const logOutAPI = () => {
    localStorage.removeItem('token');
}

const isValidToken = (token) => {
    const validToken = jwtValid(token);

    if (validToken) {
        const { exp } = jwtDecode(token);
        const expire = exp * 1000; // Milliseconds
        const timeOut = expire - Date.now();
        const valid = timeOut < 0 ? false : true;

        return valid;
    } else {
        return false;
    }
}

export const isUserLoggedAPI = () => {
    const token = getTokenAPI();

    if (!token) {
        logOutAPI();
        return
    }
    if (!isValidToken(token)) {
        logOutAPI();
        return
    }

    return jwtDecode(token);
}