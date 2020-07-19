import { getTokenAPI } from './auth';

const baseURL = process.env.REACT_APP_API_URL

export const checkFollowAPI = userID => {
    const url = `${baseURL}/consulta-relacion?id=${userID}`;

    const params = {
        headers: {
            Authorization: `Bearer${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
}

export const followUserAPI = userID => {
    const url = `${baseURL}/alta-relacion?id=${userID}`;

    const params = {
        method: 'POST',
        headers: {
            Authorization: `Bearer${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
}

export const unFollowUserAPI = userID => {
    const url = `${baseURL}/baja-relacion?id=${userID}`;

    const params = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
}

export const getFollowsAPI = paramsURL => {
    const url = `${baseURL}/lista-usuarios?${paramsURL}`;

    const params = {
        headers: {
            Authorization: `Bearer${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
}

