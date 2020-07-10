import { getTokenAPI } from './auth';

const baseURL = process.env.REACT_APP_API_URL

export const getUserAPI = userID => {
    const url = `${baseURL}/ver-perfil?id=${userID}`;

    const params = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        if (response.status >= 400) throw null;
        return response.json();
    }).catch(err => {
        return err;
    });
}