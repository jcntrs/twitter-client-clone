import { getTokenAPI } from './auth';

const baseURL = process.env.REACT_APP_API_URL

export const addTweetAPI = message => {
    const url = `${baseURL}/tweet`;
    const data = { message }

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer${getTokenAPI()}`
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return { code: response.status, message: 'Tweet publicado' }
        }
        return { code: 500, message: 'Error del servidor' }
    }).catch(err => {
        return err;
    });
}

export const getUserTweetsAPI = (userID, page) => {
    const url = `${baseURL}/leer-tweets?id=${userID}&page=${page}`;

    const params = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
}

export const getTweetsFollowersAPI = (page = 1) => {
    const url = `${baseURL}/leer-tweets-seguidores?page=${page}`;

    const params = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer${getTokenAPI()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json()
    }).catch(err => {
        return err;
    });
}