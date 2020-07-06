import Home from '../pages/home';
import Error404 from '../pages/error404';

export default [
    {
        path: '/',
        exact: true,
        page: Home
    },
    {
        path: '*',
        page: Error404
    }
]